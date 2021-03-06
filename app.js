/****************************
      setting and require
****************************/
// require
const express = require('express')
// 判斷開發環境
if (process.env.NODE_ENV !== 'production') {     //如果不是production模式
  require('dotenv').config()                     //使用dotenv讀取 .env檔案
}
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/list')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const app = express()

// port
const port = 3000

// setting static file
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// setting use method-override
app.use(methodOverride('_method'))


// user session
app.use(session({
  secret: 'xxx',
  resave: false,
  saveUninitialized: true,
}))

// connect mongodb
mongoose.connect("mongodb://127.0.0.1/restaurant", { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection

// setting express-handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//// connect db
// connect error
db.on('error', () => {
  console.log('mongodb error')
})

// connected
db.once('open', () => {
  console.log('mongodb connected')
})

// after session init passport
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')(passport)

app.use(flash())
//登入後可以取得使用者的資訊方便我們在view中直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated() //辨識使用者是否已經登入
  // 新增兩個 falsh message變數
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})


/****************************
             routes
****************************/
// routes setting
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))
app.use('/search', require('./routes/search'))
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))


/****************************
        listen server
****************************/

// start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})