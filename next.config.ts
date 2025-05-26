module.exports = {
  images: {
    domains: [
      "regreen-bucket.s3.ap-northeast-2.amazonaws.com",
      "k.kakaocdn.net",
      "img1.kakaocdn.net",
      "t1.kakaocdn.net",
    ],

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
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
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
