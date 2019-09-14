const express = require('express')
const router = express.Router()
const User = require('../models/user')

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res) => {
  res.send('login data check')
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, passwor2 } = req.body

  User.findOne({ email: email }).then(user => {
    if (user) {
      // have user
      console.log('User already exists')
      res.render('/register', { name, email, password, password2 })
    } else {
      // not found and save new
      const newUser = new User({
        name,
        email,
        password
      })
      newUser.save().then(
        res.redirect('/users/login')
      ).catch(err => console.log(err))
    }
  })
})

// 登出
router.get('/logout', (req, res) => {
  res.send('logout')
})


module.exports = router