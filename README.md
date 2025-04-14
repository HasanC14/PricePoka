# 🖥️ PricePoka — PC Parts Price Comparison in Bangladesh

PricePoka is a web application that helps users compare prices of PC parts from multiple Bangladeshi e-commerce sites. It uses web scraping to fetch updated prices from popular online shops and displays them in one place so you can make better buying decisions easily.

---

## 🧠 Why I Built This

I had a hard time searching for PC part prices in Bangladesh. Every shop had different prices, and I had to open many tabs to compare.

So, I first created a script using **Puppeteer** to scrape prices. Then I thought — why not build a website to make this process easier for everyone? That’s how **PricePoka** started. Later I replaced Puppeteer with **Cheerio** for faster scraping and better performance.

---

## ⚙️ Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Vite
- Vercel (Hosting)

### Backend

- Node.js
- Express.js
- Cheerio (Web Scraper)

> 🔗 **Backend Repo**: [https://github.com/HasanC14/PricePoka-Servre](https://github.com/HasanC14/PricePoka-Servre)

---

## 🌐 Live Website

👉 [https://pricepoka.vercel.app](https://pricepoka.vercel.app)

---

## 📦 Features

- 🔍 Real-time PC part price comparison
- 🛒 Product links to each vendor
- 📱 Fully responsive design
- ⚡ Fast and lightweight scraping

---

## ⚙️ How It Works

1. The backend uses Cheerio to scrape product data (e.g., name, price, availability) from multiple sources.
2. The data is formatted and sent to the frontend.
3. Users can view and compare prices in a clean, responsive UI.

---

## 🙌 Contributing

Found a bug or want to suggest a feature? Feel free to open an issue or submit a pull request!

This project uses a backend hosted at [https://price-poka-servre.vercel.app](https://price-poka-servre.vercel.app).

- To use the default hosted backend, simply copy `.env.example` to `.env`, and you're good to go.
- If you're running your own backend, replace the URL inside `.env` with your own.

---

Made with 💻 and ☕ by [Hasan](https://hasan-chowdhury.netlify.app/)
