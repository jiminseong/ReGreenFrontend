module.exports = {
  images: {
    domains: ["regreen-bucket.s3.ap-northeast-2.amazonaws.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/furniture/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/sw.js",

        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
        ],
      },
    ];
  },
};
