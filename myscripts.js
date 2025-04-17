const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// const { google } = require('googleapis'); // For Google Calendar

const app = express();
app.use(bodyParser.json());

app.post('/api/book', async (req, res) => {
  const { name, email, phone, date, time, guests } = req.body;

  // Example: Send confirmation email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_app_password',
    },
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Table Booking Confirmation',
    text: `Hi ${name}, your table is booked for ${date} at ${time} for ${guests} guests. Thanks!`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Email failed' });
  }

  // TODO: Add Google Calendar integration here
});

app.listen(3000, () => console.log('Server running on port 3000'));
