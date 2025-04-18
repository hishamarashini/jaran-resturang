const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/book', async (req, res) => {
  const { name, email, phone, date, time, guests } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hishamrashini@gmail.com',
      pass: 'Sam1891978!',
    },
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'Table Booking Confirmation',
    text: `Hi ${name}, your table is booked for ${date} at ${time} for ${guests} guest(s).`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Email sending failed' });
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');



    // TODO: Add Google Calendar integration here


app.listen(3000, () => console.log('Server running on port 3000'));
});




