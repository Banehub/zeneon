// app.js
const express = require('express');
const puppeteer = require('puppeteer');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

// Create a connection to the database
const con = mysql.createConnection({
    host: "41.76.110.194",
    user: "hooked_on_books",
    password: "Qwerty@01",
    database: "zeneon"
});

// Connect to the database
con.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
});

// Function to scroll to the bottom of the page and handle lazy loading
const scrollToBottom = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const delay = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, delay);
        });
    });
};

// Function to extract product details from a product page
const extractProductDetails = async (page) => {
    return await page.evaluate(() => {
        const details = {};

        // Extract all details from the elementor-shortcode elements
        document.querySelectorAll('.elementor-shortcode').forEach((shortcode) => {
            const spans = shortcode.querySelectorAll('span');
            if (spans.length >= 2) {
                const label = spans[0].innerText.trim().replace(':', '').toLowerCase();
                const value = spans[1].innerText.trim();
                details[label] = value;
            }
        });

        // Extract all details from the product_meta div
        const productMeta = document.querySelector('.product_meta');
        if (productMeta) {
            productMeta.querySelectorAll('.detail-container').forEach((container) => {
                const labelElement = container.querySelector('.detail-label');
                const valueElement = container.querySelector('.sku, .detail-content');
                if (labelElement && valueElement) {
                    const label = labelElement.innerText.trim().replace(':', '').toLowerCase();
                    const value = valueElement.innerText.trim();
                    details[label] = value;
                }
            });
        }

        // Extract Product Name
        const productNameElement = document.querySelector('.elementor-heading-title .title_wrapper span:nth-child(2)');
        if (productNameElement) {
            details['product name'] = productNameElement.innerText.trim();
        }

        // Extract images
        details['images'] = [];
        document.querySelectorAll('.woocommerce-product-gallery__image a').forEach((anchor) => {
            const imgSrc = anchor.href;
            if (imgSrc) {
                details['images'].push(imgSrc);
            }
        });

        return details;
    });
};

// Function to insert product details into the database
const insertProductDetails = (productDetails, sku) => {
    const checkQuery = "SELECT COUNT(*) AS count FROM Products WHERE Sku = ?";
    con.query(checkQuery, [sku], (err, results) => {
        if (err) throw err;

        if (results[0].count === 0) {
            const insertQuery = "INSERT INTO Products (Sku, Data, CreatedOn) VALUES (?, ?, NOW())";
            con.query(insertQuery, [sku, JSON.stringify(productDetails)], (err, result) => {
                if (err) throw err;
                console.log("Product inserted with ID:", result.insertId);
            });
        } else {
            console.log(`Product with SKU ${sku} already exists. Skipping insert.`);
        }
    });
};

// Endpoint to scrape product links and details
app.get('/scrape-products', async (req, res) => {
    const errorList = []; // List to store errors

    try {
        // Launch a headless browser with increased timeout and disable HTTP/2
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-http2'],
        });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(60000); // Set navigation timeout to 60 seconds

        // Replace with the actual URL of the page you want to scrape
        const url = 'https://klight.co.za/products/';
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Scroll to the bottom of the page to load all categories
        await scrollToBottom(page);

        // Extract category links, titles, and product counts
        const categoryLinks = await page.evaluate(() => {
            const links = [];
            document.querySelectorAll('ul.products.elementor-grid.columns-4 li.product-category a').forEach((anchor) => {
                const titleElement = anchor.querySelector('h2.woocommerce-loop-category__title');
                const countElement = titleElement.querySelector('mark.count');
                links.push({
                    href: anchor.href,
                    title: titleElement ? titleElement.childNodes[0].nodeValue.trim() : 'No title',
                    count: countElement ? countElement.innerText.match(/\d+/)[0] : '0'
                });
            });
            return links;
        });

        const allProductDetails = [];

        // Visit each category and extract product links and details one at a time
        for (const categoryLink of categoryLinks) {
            await page.goto(categoryLink.href, { waitUntil: 'networkidle2' });
            await scrollToBottom(page);

            const products = await page.evaluate(() => {
                const productLinks = [];
                document.querySelectorAll('ul.products li.product a.woocommerce-LoopProduct-link').forEach((anchor) => {
                    const titleElement = anchor.querySelector('h2.woocommerce-loop-product__title');
                    const skuElement = anchor.querySelector('h3');
                    productLinks.push({
                        title: titleElement ? titleElement.innerText : 'No title',
                        link: anchor.href,
                        sku: skuElement ? skuElement.innerText : 'No SKU'
                    });
                });
                return productLinks;
            });

            for (const product of products) {
                try {
                    await page.goto(product.link, { waitUntil: 'networkidle2' });
                    const productDetails = await extractProductDetails(page);

                    // Log the product details
                    console.log(`Scraped product: ${product.title}`);
                    console.log(productDetails);

                    // Insert product details into the database
                    insertProductDetails(productDetails, product.sku);

                    allProductDetails.push({
                        category: categoryLink.title,
                        product: productDetails
                    });
                } catch (productError) {
                    console.error(`Error scraping product ${product.title}:`, productError);
                    errorList.push({ product: product.title, error: productError.message });
                }
            }
        }

        // Close the browser
        await browser.close();

        // Send the list of product details and errors as a JSON response
        res.json({ products: allProductDetails, errors: errorList });
    } catch (error) {
        console.error('Error scraping products:', error);
        res.status(500).send('An error occurred while scraping products.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});