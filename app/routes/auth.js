var authController = require('../controllers/authController.js');
 
module.exports = function(app, passport) {

    app.get('/signup', authController.signup);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }));

    app.get('/signin', authController.signin);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin',
        session: true
    }));

    app.get('/logout', authController.logout);
}