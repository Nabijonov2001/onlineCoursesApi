const express = require('express')
const categoriesRoute = require('./routes/catigories')
const customersRoute = require('./routes/customers')
const coursesRoute = require('./routes/courses')
const entrollmentsRoute = require('./routes/enrollment')
const usersRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const app = express()
const mongoose = require('mongoose')
const { CONNECTION_STRING, PORT } = require('./config')



mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDBga ulanish hosil qilindi...')
  })
  .catch((err) => {
    console.error('MongoDBga ulanish vaqtida xato ro\'y berdi...', err)
  })
app.use(express.json())
app.use('/api/categories', categoriesRoute)
app.use('/api/customers', customersRoute)
app.use('/api/courses', coursesRoute)
app.use('/api/enrollments', entrollmentsRoute)
app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)

const port = PORT || 5000

app.listen(port, () => {
  console.log(`${port}chi portni eshitishni boshladim...`)
})