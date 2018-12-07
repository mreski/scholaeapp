var testController = require('../controllers/testController.js');

module.exports = function(app, passport) {

    app.get('/test/create', isTeacher, (req, res) => {
        res.render('test/create');
    });

    app.post('/test/create', isTeacher, testController.create);

    app.post('/test/drop/:id', isTeacher, testController.drop);

    app.get('/test/list', isTeacher, testController.listGet);

    app.get('/test/edit/:id', isTeacher, testController.editGet);

    app.post('/test/question/create', isTeacher, testController.createQuestion);

    app.post('/test/question/edit/:id', isTeacher, testController.editQuestion);

    app.post('/test/question/drop/:id', isTeacher, testController.dropQuestion);

    app.get('/test/access/:id', isTeacher, testController.accessGet);
    app.post('/test/access/:id', isTeacher, testController.accessGet);

    app.post('/test/access/revoke/:id', isTeacher, testController.revokeAccess);

    app.post('/test/access/give/:id', isTeacher, testController.giveAccess);

    app.get('/test/:id', isLoggedIn, testController.showTest);

    app.post('/test/check', isLoggedIn, testController.checkTest);

    app.get('/test/correct/:id', isLoggedIn, testController.correctAnswers);

    app.get('/test/results/:id', isTeacher, testController.results);
    app.post('/test/results/:id', isTeacher, testController.results);

    function isTeacher(req, res, next) {
        if (req.isAuthenticated() && (req.user.role == 'teacher' || req.user.role == 'admin')) {
            return next();
        }

        res.redirect('/signin');
    }

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/signin');
    }
}