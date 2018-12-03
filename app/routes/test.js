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

    function isTeacher(req, res, next) {
        if (req.isAuthenticated() && (req.user.role == 'teacher' || req.user.role == 'admin')) {
            return next();
        }

        // return next(); // delete on production
        res.redirect('/signin');
    }
}