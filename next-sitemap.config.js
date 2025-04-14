import config from "@/../portfolio.config";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: config.url,
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
};
