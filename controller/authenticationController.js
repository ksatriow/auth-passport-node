const { User } = require('../models')
const passport = require('../library/passport')

module.exports = {
    register: (req, res, next) => {
        User.register(req.body)
        .then(()=>{
            res.redirect('/login')
        })
        .catch(err => next(err))
    },

    login: passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true 
    }),

    whoami: (req, res) => {
        res.render('profile', req.user.dataValues)
    }
}