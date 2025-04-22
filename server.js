const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle booking POST request
app.post('/api/book-table', (req, res) => {
  const { name, email, phone, date, time, guests } = req.body;

  console.log('New Reservation:');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone}`);
  console.log(`Date: ${date}`);
  console.log(`Time: ${time}`);
  console.log(`Guests: ${guests}`);

  // Send confirmation back to frontend
  res.json({ message: 'Table reserved successfully!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
