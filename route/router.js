const router = require('express').Router()
const passport = require('passport')
const auth = require('../controller/authenticationController')
const restrict = require('../middleware/restrict')

router.get('/', restrict, (req, res) => res.render('index'))

router.get('/register', (req, res) => res.render('register'))
router.post('/register', auth.register)
router.get('/login', (req, res) => res.render('login'))

router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/profile', restrict, auth.whoami)

router.post('/login', auth.login)

module.exports = router