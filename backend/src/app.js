import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';
import requestLogger from './middleware.mjs';
import dotenv from 'dotenv';
dotenv.config();
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
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send(`Error sending email ${error}`);
    console.log(error);
  }
});
export { app };