var exports = module.exports = {}

exports.signup = function(req, res) {
    res.render('signup', {layout: 'signLayout'});
}

exports.signin = function(req, res) {
    res.render('signin', {layout: 'signLayout'});
}

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}