const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('./user');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '')));

// MongoDB connection string. You'll need to have MongoDB running locally.
const mongoDbUri = 'mongodb://localhost:27017/bloglist_app';

// Connect to MongoDB
mongoose.connect(mongoDbUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// API endpoint to create a new user
app.post('/api/users', async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || !password || !name) {
    return res.status(400).json({ error: 'Username, name, and password are required.' });
  }

  if (username.length < 3 || password.length < 3) {
    return res.status(400).json({ error: 'Username and password must be at least 3 characters long.' });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Username already exists.' });
    }
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

// API endpoint to get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}).select('username name id');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
