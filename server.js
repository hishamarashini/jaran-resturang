const express = require('express');
const cors = require('cors'); // <-- required for CORS
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Booking route
app.post('/api/book', async (req, res) => {
  const { name, email, phone, date, time, guests } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hishamrashini@gmail.com',
      pass: 'password'
    }
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: `${email}, hishamrashini@gmail.com`, // Sends to both user and you
    subject: 'Booking Confirmation - DelishBite',
    text: `Booking from ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${email}`);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    res.status(500).json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);


      // TODO: Add Google Calendar integration here


app.listen(3000, () => console.log('Server running on port 3000'));
});







