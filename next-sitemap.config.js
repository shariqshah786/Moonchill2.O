/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://moonchill.in",
  generateRobotsTxt: true,
  sitemapSize: 5000,
};
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://moonchill.in", // 👈 your live domain
  generateRobotsTxt: true,        // generates robots.txt
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/api/*"],            // exclude API routes
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    additionalSitemaps: [
      "https://moonchill.in/sitemap.xml",
    ],
  },
};
