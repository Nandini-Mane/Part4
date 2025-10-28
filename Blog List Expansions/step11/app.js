const express = require('express')
const mongoose = require('mongoose') // ✅ Added
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.set('strictQuery', false)

app.get('/', (req, res) => {
  res.json({ message: 'Server is running successfully!' })
})

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
