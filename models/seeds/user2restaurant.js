// require
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Restaurant = require('../models/list')
const User = require('../models/user')
const restaurantList = require('../restaurant').results
const userList = require('../seeduser').results

// db connect
mongoose.connect('mongodb://127.0.0.1/restaurant', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected')
  let index = 0
  for (let i = 0; i < userList.length; i++) {

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(userList[i].password, salt, (err, hash) => {
        if (err) throw err
        userList[i].password = hash

        User.create(userList[i]).then(user => {
          let count = 0
          for (let i = index; i < restaurantList.length; i++) {
            restaurantList[i].userId = user._id
            Restaurant.create(restaurantList[i])

            count++
            index = i + 1
            if (count === 3) break
          }
        })
      })
    })
  }
  console.log('done')
})

