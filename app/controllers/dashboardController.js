var exports = module.exports = {};

var path = require("path");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, {host: config.host, dialect: config.dialect});

var models = require('sequelize-import')(path.join(__dirname, '..', 'models'), sequelize, { 
    exclude: ['index.js'] 
});

const UserHasTest = models.userHasTest;
const Test = models.test;

exports.dashboard = function(req, res) {
    const idUser = req.user.id;

    sequelize.query(
        `SELECT * FROM tests JOIN userhastests ON tests.id = userhastests.idTest JOIN users ON users.id = userhastests.idUser WHERE userhastests.idUser = ${idUser} AND userhastests.status IS NOT NULL`
    ).then((tests) => {
        res.render('dashboard', {user: req.user, tests: tests});
    })
}