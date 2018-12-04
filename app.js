var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars')

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized:false})); // session secret
// app.use(express.cookieParser());
// app.use(express.bodyParser());
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// View Engine
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'layout',
    layoutsDir: './app/views/layouts'
}));
app.set('view engine', '.hbs');

// public folder
app.use(express.static(`${__dirname}\\public\\`));

//Models
var models = require("./app/models");

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);
var dashboardRoute = require('./app/routes/dashboard.js')(app, passport);
var testRoute = require('./app/routes/test.js')(app, passport);
 
//Sync Database
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});
 
app.listen(3000, function(err) {
    if(!err) {
        console.log("Site is live");
    }
    else {
        console.log(err)
    }
});