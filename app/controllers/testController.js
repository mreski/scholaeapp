var exports = module.exports = {};

var path = require("path");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, {host: config.host, dialect: config.dialect});

var models = require('sequelize-import')(path.join(__dirname, '..', 'models'), sequelize, { 
    exclude: ['index.js'] 
});

const Test = models.test;
const Question = models.question;
  
exports.create = (req, res) => {
    
    var testName = req.body.testname;
    var testDescription = req.body.testdescription;
    const uid =  req.user.id;
    
    Test.build({
        name: testName,
        description: testDescription,
        owner: uid
    }).save().then((test) => {
        res.redirect(`/test/edit/${test.id}`);
    })
}

exports.drop = (req, res) => {

    const uid = req.user.id;
    var testToDelete = req.params.id;

    Test.findOne({
        where: {
            id: testToDelete
        }
    }).then((test) => {
        if(test.owner != uid) {
            res.redirect('/test/list');
        } else {
            Test.destroy({
                where: {
                    id: testToDelete
                }
            }).then(() => {
                res.redirect('/test/list');
            });
        }
    });
}

exports.listGet = (req, res) => {
    
    const uid = req.user.id;

    Test.findAll({
        where: {
            owner: uid
        }
    }).then((tests) => {
        res.render('test/list', {tests: tests});
    });
}

exports.editGet = (req, res) => {

    const idTest = req.params.id;

    Question.findAll({
        where: {
            idTest: idTest
        }
    }).then((questions) => {
        res.render('test/edit', {questions: questions, idTest: idTest});
    });
}

exports.createQuestion = (req, res) => {

    const idTest = req.body.idTest;
    const question = req.body.question;
    const ansA = req.body.ansA;
    const ansB = req.body.ansA;
    const ansC = req.body.ansA;
    const ansD = req.body.ansA;
    const correct = req.body.correct;
    const points = req.body.points || 1;

    Question.build({
        question: question,
        ansA: ansA,
        ansB: ansB,
        ansC: ansC,
        ansD: ansD,
        correct: correct,
        points: points,
        idTest: idTest
    }).save().then(() => {
        res.redirect(`/test/edit/${idTest}`);
    })
}