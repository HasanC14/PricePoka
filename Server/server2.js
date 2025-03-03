const express = require("express");
const cors = require("cors");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = 3000;
app.use(cors());

// Scraper for StarTech
const scrapeStarTech = async (product) => {
  try {
    const response = await axios.get(
      `https://www.startech.com.bd/product/search?search=${product}`
    );
    const $ = cheerio.load(response.data);
    const products = [];

    $(".p-item").each((index, element) => {
      const name =
        $(element).find(".p-item-name").text().trim() || "Name not found";
      const price =
        $(element).find(".p-item-price").text().trim() || "Out Of Stock";
      const img =
        $(element).find(".p-item-img img").attr("src") || "Image not found";
      const link =
        $(element).find(".p-item-img a").attr("href") || "Link not found";

      products.push({ name, price, img, link });
    });

    return products;
  } catch (error) {
    console.error("Error scraping StarTech:", error);
    return [];
  }
};

// Scraper for TechLand
const scrapeTechLand = async (product) => {
  try {
    const response = await axios.get(
      `https://www.techlandbd.com/index.php?route=product/search&search=${product}`
    );
    const $ = cheerio.load(response.data);
    const products = [];

    $(".product-layout").each((index, element) => {
      const name = $(element).find(".name").text().trim() || "Name not found";
      const price =
        $(element).find(".price-new").text().trim() || "Out Of Stock";
      const img =
        $(element).find(".image img").attr("src") || "Image not found";
      const link =
        $(element).find(".product-img").attr("href") || "Link not found";

      products.push({ name, price, img, link });
    });

    return products;
  } catch (error) {
    console.error("Error scraping TechLand:", error);
    return [];
  }
};

const scrapeRyans = async (product) => {
  try {
    const response = await axios.get(
      `https://www.ryans.com/search?q=${product}`
    );
    const $ = cheerio.load(response.data);
    const products = [];

    $(".category-single-product").each((index, element) => {
      const name =
        $(element).find(".card-text a").text().trim() || "Name not found";
      const price = $(element).find(".pr-text").text().trim() || "Out Of Stock";
      const img =
        $(element).find(".image-box img").attr("src") || "Image not found";
      const link =
        $(element).find(".image-box a").attr("href") || "Link not found";

      products.push({ name, price, img, link });
    });

    return products;
  } catch (error) {
    console.error("Error scraping TechLand:", error);
    return [];
  }
};
const scrapeBinary = async (product) => {
  try {
    const response = await axios.get(
      `https://www.binarylogic.com.bd/search/${product}`
    );
    const $ = cheerio.load(response.data);
    const products = [];

    $(".single_product").each((index, element) => {
      const name =
        $(element).find(".p-item-name").text().trim() || "Name not found";
      const price =
        $(element).find(".current_price").text().trim() || "Out Of Stock";
      const img =
        $(element).find(".p-item-img img").attr("src") || "Image not found";
      const link =
        $(element).find(".p-item-img a").attr("href") || "Link not found";

      products.push({ name, price, img, link });
    });

    return products;
  } catch (error) {
    console.error("Error scraping TechLand:", error);
    return [];
  }
};
const scrapePcHouse = async (product) => {
  try {
    const response = await axios.get(
      `https://www.pchouse.com.bd/index.php?route=product/search&search=${product}`
    );
    const $ = cheerio.load(response.data);
    const products = [];

    $(".product-layout").each((index, element) => {
      const name = $(element).find(".name").text().trim() || "Name not found";
      const price =
        $(element).find(".price-new").text().trim() || "Out Of Stock";
      const img =
        $(element).find(".product-img img").attr("src") || "Image not found";
      const link =
        $(element).find(".product-img").attr("href") || "Link not found";

      products.push({ name, price, img, link });
    });

    return products;
  } catch (error) {
    console.error("Error scraping TechLand:", error);
    return [];
  }
};
const scrapePotakaIT = async (product) => {
  try {
    const response = await axios.post(
      `https://www.potakait.com/index.php?route=product/search&search=${product}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
          "Upgrade-Insecure-Requests": "1",
          "Cache-Control": "max-age=0",
          TE: "Trailers",
          DNT: "1", // Do Not Track header
          Referer: "https://www.potakait.com", // Referer header may help
          Origin: "https://www.potakait.com", // Sometimes needed
          Cookie: "ar_debug=1",
        },
      }
    );

    const $ = cheerio.load(response.data);
    const products = [];

    $(".product-layout").each((index, element) => {
      const name = $(element).find(".name").text().trim() || "Name not found";
      $(element).find(".price-new").text().trim() ||
        $(element).find(".price-normal").text().trim() ||
        "Out Of Stock";
      const img =
        $(element).find(".product-img img").attr("src") || "Image not found";
      const link =
        $(element).find(".product-img").attr("href") || "Link not found";

      products.push({ name, price, img, link });
    });

    return products;
  } catch (error) {
    console.error("Error scraping TechLand:", error);
    return [];
  }
};
const scrapeUltraTech = async (product) => {
  try {
    const response = await axios.get(
      `https://www.ultratech.com.bd/index.php?route=product/search&search=${product}`
    );
    const $ = cheerio.load(response.data);
    const products = [];

    $(".product-layout").each((index, element) => {
      const name = $(element).find(".name").text().trim() || "Name not found";
      const price =
        $(element).find(".price-new").text().trim() || "Out Of Stock";
      const img =
        $(element).find(".product-img img").attr("src") || "Image not found";
      const link =
        $(element).find(".product-img").attr("href") || "Link not found";

      products.push({ name, price, img, link });
    });

    return products;
  } catch (error) {
    console.error("Error scraping TechLand:", error);
    return [];
  }
};

// Combined API Endpoint
app.get("/scrape/:product", async (req, res) => {
  let product = req.params.product;
  product = product.replace(/\s+/g, "%20");

  const [
    starTechProducts,
    techLandProducts,
    ryansProducts,
    binaryProducts,
    ultraProducts,
    // potakaProducts,
    pchouseProducts,
  ] = await Promise.all([
    scrapeStarTech(product),
    scrapeTechLand(product),
    scrapeRyans(product),
    scrapeBinary(product),
    // scrapePotakaIT(product),
    scrapePcHouse(product),
    scrapeUltraTech(product),
  ]);

  res.json({
    StarTech: starTechProducts,
    TechLand: techLandProducts,
    Ryans: ryansProducts,
    Binary: binaryProducts,
    // PotakaIT: potakaProducts,
    PcHouse: pchouseProducts,
    UltraTech: ultraProducts,
  });
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
