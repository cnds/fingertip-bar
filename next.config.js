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
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["statics1.qkcdn.com", "upload1.qkcdn.com", "upload.qkcdn.com", "pic1.imgdb.cn", "16014459.s21i.faiusr.com"],
  },
  async rewrites() {
    return [
      {
        source: "/m/:path*",
        destination: "https://api.maobey.com/m/:path*",
      },
    ];
  },
};

module.exports = withTM(nextConfig);
