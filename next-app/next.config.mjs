/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      instrumentationHook: false,
    },
    webpack: (config) => {
      config.resolve.fallback = {
        fs: false,
      };
      return config;
    },
  };
  
  export default nextConfig;