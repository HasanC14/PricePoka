const SitemapGenerator = require("sitemap-generator");

// Replace with your deployed URL
const generator = SitemapGenerator("https://pricepoka.vercel.app", {
  stripQuerystring: false,
  filepath: "./public/sitemap.xml",
  maxDepth: 0,
});

// Start the crawler
generator.start();
