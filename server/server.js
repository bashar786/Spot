const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const ip = require('ip');
const app = express();
const port = 3000; // Port number for your server
const axios = require('axios');
const cheerio = require('cheerio');

// URL of the website you want to scrape
const baseURL = 'https://www.dovetailhome.com/';
// Middleware
app.use(cors());
app.use(bodyParser.json());
const serverIpAddress = ip.address();
// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Replace with your email service provider
  auth: {
    user: " malikhaiderali434@gmail.com", // Use environment variable for email
    pass: "vzzm jsha tqpc ixbn", // Use environment variable for password
  },
});

// Store generated OTPs in memory (for demonstration purposes)
const otpStore = {};

// Route to send email with OTP
app.post('/sendEmail', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store OTP with email (in-memory storage)
  otpStore[email] = otp;

  // Email options
  const mailOptions = {
    from: "Spot spot@contact.com",
    to: email,
    subject: 'OTP Verification Code',
    text: `Your OTP for verification is ${otp}.`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: 'Failed to send OTP' });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

// Route to verify OTP
app.post('/verifyOTP', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required' });
  }

  // Check if OTP matches
  if (otp === otpStore[email]) {
    // Clear OTP from store after verification (for security)
    delete otpStore[email];
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ error: 'Incorrect OTP' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Open the browser window
  const page = await browser.newPage();

  try {
    // Login
    console.log('Navigating to login page...');
    await page.goto('https://www.dovetailhome.com/account/login/', { waitUntil: 'networkidle2', timeout: 60000 });

    console.log('Filling out login form...');
    await page.type('input[name="email"]', 'hagoptrade@gmail.com'); // Replace with your email
    await page.type('input[name="password"]', 'Furniture?66'); // Replace with your password
    await page.click('button[type="button"]'); // Click the button to log in

    console.log('Waiting for redirection to home page...');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });

    // Ensure redirection to home page
    const url = page.url();
    if (!url.includes('https://www.dovetailhome.com/')) {
      throw new Error('Login failed or did not redirect to the home page.');
    }

    console.log('Successfully logged in and redirected to home page.');

    // Extract collection links from the home page
    console.log('Navigating to home page...');
    await page.goto('https://www.dovetailhome.com/', { waitUntil: 'networkidle2', timeout: 60000 });

    console.log('Extracting collection links...');
    const homeCollectionLinks = await page.evaluate(() => {
      const links = [];
      document.querySelectorAll('a').forEach(anchor => {
        const href = anchor.href;
        if (href.includes('/living/')) { // Adjust filter as needed
          const title = anchor.innerText.trim();
          const img = anchor.querySelector('img') ? anchor.querySelector('img').src : '';
          links.push({ href, title, img });
        }
      });
      return links;
    });

    console.log('Home collection links:', homeCollectionLinks);

    // Function to extract product links and details from a collection page
    const extractProductLinksFromCollection = async (url) => {
      console.log(`Navigating to collection page: ${url}`);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

      console.log('Extracting product links...');
      const productLinks = await page.evaluate(() => {
        const links = [];
        document.querySelectorAll('a').forEach(anchor => {
          const href = anchor.href;
          if (href.includes('/living/') || href.includes('/product/')) { // Adjust filter as needed
            links.push(href);
          }
        });
        return links;
      });

      return productLinks;
    };

    // Function to extract detailed data from a product page
    const extractProductData = async (url) => {
      console.log(`Navigating to product page: ${url}`);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

      console.log('Extracting product data...');
      const data = await page.evaluate(() => {
        const extractText = (selector) => Array.from(document.querySelectorAll(selector)).map(element => element.innerText.trim());
        const images = Array.from(document.querySelectorAll('img')).map(img => img.src);
        const links = Array.from(document.querySelectorAll('a')).map(anchor => anchor.href);

        return {
          text: {
            p: extractText('p'),
            h1: extractText('h1'),
            h2: extractText('h2'),
            h3: extractText('h3'),
            h4: extractText('h4'),
            h5: extractText('h5'),
            h6: extractText('h6'),
            a: extractText('a')
          },
          images,
          links
        };
      });

      return data;
    };

    // Process each collection link
    for (const collection of homeCollectionLinks) {
      console.log(`Processing collection: ${collection.href}`);
      const productLinks = await extractProductLinksFromCollection(collection.href);

      if (productLinks.length === 0) {
        console.log(`No products found in collection: ${collection.href}`);
        continue;
      }

      for (const productLink of productLinks) {
        const productData = await extractProductData(productLink);
        console.log(`Data from product ${productLink}:`, productData);
      }
    }

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    console.log('Keeping browser open for debugging...');
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 60000))); // Keeps the browser open for 60 seconds
    console.log('Closing browser...');
    await browser.close();
  }
})();

