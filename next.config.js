// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;

// /** @type {import('next').NextConfig} */

const NextFederationPlugin = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "main",
        filename: "static/chunks/remoteEntry.js",
        exposes: {},
        remotes: {
          dashboard: `dashboard@http://localhost:3001/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        shared: {
          "next/router": {
            singleton: true,
            requiredVersion: false,
          },
        },
      })
    );

    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
