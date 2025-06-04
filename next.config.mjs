/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/.well-known/appspecific/com.chrome.devtools.json",
        destination: "/api/devtools.json",
      },
    ];
  },
};

export default nextConfig;
