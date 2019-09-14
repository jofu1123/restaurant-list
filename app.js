/****************************
      setting and require
****************************/
// require
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/list')
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
mongoose.connect("mongodb://127.0.0.1/restaurant", { useNewUrlParser: true })
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

//登入後可以取得使用者的資訊方便我們在view中直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated() //辨識使用者是否已經登入
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


/****************************
        listen server
****************************/

// start and listen on the express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})