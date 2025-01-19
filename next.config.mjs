
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /pdf\.worker\.(min\.)?js$/,
        type: "asset/resource",
      });
      return config;
    },
  };
  
  export default nextConfig;
  