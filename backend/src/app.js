const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const requestLogger = require('./middleware');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger); // Use the middleware

app.post('/send-email', async (req, res) => {
  const { recipientEmail, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

module.exports = app;