// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Route to fetch news
app.get('/api/news', async (req, res) => {
  const { category } = req.query;
  const apiKey = process.env.VITE_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=9e3c202faf3d4132bb28ac7d01170009`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});