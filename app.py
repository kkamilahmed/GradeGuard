import os
import openai
import PyPDF2
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)
# Configure allowed file extensions and upload folder
ALLOWED_EXTENSIONS = {'pdf'}
app.config['UPLOAD_FOLDER'] = 'uploads'

# Ensure the upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def allowed_file(filename):
    """Check if the file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_pdf(pdf_path):
    """Extract text from a PDF file using PyPDF2."""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                extracted_text = page.extract_text()
                if extracted_text:
                    text += extracted_text + "\n"
        return text.strip()
    except Exception as e:
        return f"Error reading PDF: {e}"

def get_feedback_from_openai(rubric, essay):
    """Send extracted text to OpenAI for feedback on grading fairness."""
    try:
        completion = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[ 
                {"role": "system", "content": "You are an expert essay evaluator."},
                {"role": "user", "content": f"Here is the grading rubric:\n{rubric}\n\nHere is the student's essay:\n{essay}\n\nBased on the rubric, was the grading fair? If not, where should the student have received more points? Provide specific feedback. Please answer in bullet points and keep it short"}
            ]
        )
        return completion.choices[0].message["content"]
    except Exception as e:
        return f"Error with OpenAI API: {e}"

@app.route('/upload', methods=['POST'])
def upload_files():
    """Handle PDF file uploads and process them for feedback."""
    if 'essay' not in request.files or 'rubric' not in request.files:
        return jsonify({"error": "Both 'essay' and 'rubric' PDFs are required"}), 400
    
    essay_file = request.files['essay']
    rubric_file = request.files['rubric']

    # Check if files are allowed
    if not (allowed_file(essay_file.filename) and allowed_file(rubric_file.filename)):
        return jsonify({"error": "Both files must be PDF format"}), 400
    
    essay_filename = secure_filename(essay_file.filename)
    rubric_filename = secure_filename(rubric_file.filename)
    
    essay_path = os.path.join(app.config['UPLOAD_FOLDER'], essay_filename)
    rubric_path = os.path.join(app.config['UPLOAD_FOLDER'], rubric_filename)
    
    essay_file.save(essay_path)
    rubric_file.save(rubric_path)
    
    # Extract text from the uploaded PDFs
    essay_text = extract_text_from_pdf(essay_path)
    rubric_text = extract_text_from_pdf(rubric_path)
    
    if "Error" in essay_text:
        return jsonify({"error": essay_text}), 500
    if "Error" in rubric_text:
        return jsonify({"error": rubric_text}), 500
    
    # Get feedback from OpenAI
    feedback = get_feedback_from_openai(rubric_text, essay_text)
    
    return jsonify({"feedback": feedback})

if __name__ == "__main__":
    app.run(debug=True)