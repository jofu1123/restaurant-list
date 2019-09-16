const mongoose = require('mongoose')
const User = require('../models/user')
const userList = require('../seeduser').results

mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected')

  for (item in userList) {
    User.create(userList[item])
  }
  console.log('done')
})
