var dashboardController = require('../controllers/dashboardController.js');
 
module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.send('Welcome to Passport with Sequelize');
    });

    app.get('/dashboard', isLoggedIn, dashboardController.dashboard);

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/signin');
    }
}