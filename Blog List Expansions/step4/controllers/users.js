const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// ➕ Create a new user
usersRouter.post('/', async (request, response, next) => {
  try {
    const { username, name, password } = request.body

    // ✅ Check required fields
    if (!username || !password) {
      return response
        .status(400)
        .json({ error: 'username and password are required' })
    }

    // ✅ Minimum length validation
    if (username.length < 3 || password.length < 3) {
      return response
        .status(400)
        .json({ error: 'username and password must be at least 3 characters long' })
    }

    // ✅ Hash password before saving
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    // If username already exists or validation fails
    next(error)
  }
})

// 📜 Get all users
usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter
