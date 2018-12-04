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
const User = models.user;
const UserHasTest = models.userHasTest;
  
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
    const ansB = req.body.ansB;
    const ansC = req.body.ansC;
    const ansD = req.body.ansD;
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

exports.editQuestion = (req, res) => {

    const idQuestion = req.params.id;
    const idTest = req.body.idTest;
    const question = req.body.question;
    const ansA = req.body.ansA;
    const ansB = req.body.ansB;
    const ansC = req.body.ansC;
    const ansD = req.body.ansD;
    const correct = req.body.correct;
    const points = req.body.points || 1;

    Question.update({
        question: question,
        ansA: ansA,
        ansB: ansB,
        ansC: ansC,
        ansD: ansD,
        correct: correct,
        points: points,
        idTest: idTest
    }, {
        where: {
            id: idQuestion
        } 
    }).then(() => {
        res.redirect(`/test/edit/${idTest}`);
    });
}

exports.dropQuestion = (req, res) => {

    const idQuestion = req.params.id;
    const idTest = req.body.idTest;

    Question.destroy({
        where: {
            id: idQuestion
        }
    }).then(() => {
        res.redirect(`/test/edit/${idTest}`);
    });
}

exports.accessGet = (req, res) => {

    const idTest = req.params.id;
    var userClass = `${req.body.classnumber}${req.body.classletter}`;
    var userGroup = 1;

    if(userClass == 'undefinedundefined') {
        userClass = '1a';
    }

    if(userGroup == 'undefined') {
        userGroup = '1';
    }

    User.findAll({
        where: {
            class: userClass,
            group: userGroup
        }
    }).then((users) => {
        users.forEach((user) => {
            UserHasTest.findOne({
                where: {
                    idUser: user.id,
                    idTest: idTest
                }
            }).then((hasTest) => {
                if(!hasTest) {
                    UserHasTest.build({
                        idUser: user.id,
                        idTest: idTest
                    }).save();
                }
            });
        });
    });

    sequelize.query(
        `SELECT users.id, users.firstname, users.lastname, userhastests.idTest, userhastests.status FROM users LEFT JOIN userhastests ON users.id = userhastests.idUser WHERE (userhastests.idTest = ${idTest} OR userhastests.idTest IS NULL) AND users.class = '${userClass}' AND users.group = '${userGroup}' GROUP BY users.id ORDER BY users.lastname`
    ).then((usersHaveTest) => {
        // console.log(usersHaveTest);
        res.render('test/access', {idTest: idTest, usersHaveTest: usersHaveTest});
    });
}

exports.revokeAccess = (req, res) => {

    const idUser = req.params.id;
    const idTest = req.body.idTest;

    UserHasTest.destroy({
        where: {
            idUser: idUser,
            idTest: idTest
        }
    }).then(() => {
        res.redirect(`/test/access/${idTest}`);
    });
}

exports.giveAccess = (req, res) => {

    const idUser = req.params.id;
    const idTest = req.body.idTest;

    UserHasTest.update({
        status: 1,
    }, {
        where: {
            idUser: idUser,
            idTest: idTest
        }
    }).then(() => {
        res.redirect(`/test/access/${idTest}`);
    });
}