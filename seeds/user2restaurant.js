// require
const mongoose = require('mongoose')
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
  for (item in userList) {

    User.create(userList[item]).then(user => {
      let count = 0
      for (let i = index; i < restaurantList.length; i++) {
        restaurantList[i].userId = user._id
        Restaurant.create(restaurantList[i])

        count++
        index = i + 1
        if (count === 3) break
      }
    })
  }
  console.log('done')
})

