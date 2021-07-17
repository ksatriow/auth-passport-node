const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('express-flash')



app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'Buat ini menjadi rahasia',
    resave: false,
    saveUninitialized: false
}))

const passport = require('./library/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.set('view engine', 'ejs')

const router = require('./route/router')
app.use(router)
app.listen(3000, () => console.log(`Server Berjalan`))