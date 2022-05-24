/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")(["antd-mobile"]);

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = withTM(nextConfig);
