require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./user');
const Blog = require('./blog');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '')));

// MongoDB connection
const mongoDbUri = process.env.MONGODB_URI;

mongoose.connect(mongoDbUri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// JWT authentication middleware
const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

// API endpoint to get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs.' });
  }
});

// API endpoint to create a new blog post
app.post('/api/blogs', async (req, res) => {
  const { title, content } = req.body;
  const token = getTokenFrom(req);

  if (!token) {
    return res.status(401).json({ error: 'Token missing or invalid.' });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token invalid.' });
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return res.status(401).json({ error: 'User not found.' });
  }

  const blog = new Blog({
    title,
    content,
    user: user._id,
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 });
    res.status(201).json(populatedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API endpoint to delete a blog post
app.delete('/api/blogs/:id', async (req, res) => {
  const token = getTokenFrom(req);
  if (!token) {
    return res.status(401).json({ error: 'Token missing.' });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token invalid.' });
  }

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    if (blog.user.toString() !== decodedToken.id.toString()) {
      return res.status(403).json({ error: 'Unauthorized: You can only delete your own blog posts.' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

// API endpoint to create a new user
app.post('/api/users', async (req, res) => {
  const { username, name, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  if (password.length < 3) {
    return res.status(400).json({ error: 'Password must be at least 3 characters long.' });
  }
  
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API endpoint for user login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordCorrect) {
    return res.status(401).json({
      error: 'Invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);
  res.status(200).send({ token, username: user.username, name: user.name, id: user.id });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
