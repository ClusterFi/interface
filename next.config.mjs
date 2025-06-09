
// export default nextConfig;
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

  webpack(config, { isServer }) {
    // 1. Tell Webpack to treat HeartbeatWorker.js as an ES module
    config.module.rules.push({
      test: /HeartbeatWorker\.js$/,
      type: 'javascript/esm',
    });

    // 2. Exclude it from Terser minification
    config.optimization.minimizer = config.optimization.minimizer.map((plugin) => {
      if (plugin.constructor.name === 'TerserPlugin') {
        return new plugin.constructor({
          ...plugin.options,
          exclude: /HeartbeatWorker/,
        });
      }
      return plugin;
    });

    return config;
  },
};

export default nextConfig;

