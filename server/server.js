const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const ip = require('ip');
const app = express();
const port = 3000; // Port number for your server

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
