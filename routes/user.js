const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')


// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入檢查
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {    // 使用passport認證
    successRedirect: '/',             // 成功回根目錄
    failureRedirect: '/users/login'   // 失敗回login
  })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊檢查
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: '所有欄位都是必填' })
  }

  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      password,
      password2
    })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        // have user
        errors.push({ message: '這個Email已經註冊過了' })
        res.render('/register', { name, email, password, password2 })
      } else {
        // not found and save new
        const newUser = new User({
          name,
          email,
          password
        })

        //use bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash

            newUser.save().then(
              res.redirect('/users/login')
            ).catch(err => console.log(err))
          })
        })
      }
    })
  }
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})


module.exports = router