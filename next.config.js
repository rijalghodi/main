const CHILD_URL = process.env.CHILD_URL;

// /** @type {import('next').NextConfig} */

const NextFederationPlugin = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "main",
        // filename: "static/chunks/remoteEntry.js",
        filename: `static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
        exposes: {},
        remotes: {
          child: `child@${CHILD_URL}/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        shared: {
          // "next/router": {
          //   singleton:  true,
          //   requiredVersion: false,
          // },
          // "react/jsx-runtime": {
          //   singleton: true,
          //   requiredVersion: false,
          //   eager: false,
          //   import: false,
          // },
        },
      })
    );

    return config;
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
