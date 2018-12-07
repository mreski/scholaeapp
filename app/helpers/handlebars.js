var register = function(Handlebars) {
    var helpers = {
        answerIsEqual: (userAnswer, correctAnswer, ret, options) => {
            if(userAnswer == correctAnswer) {
                return `<font style='color: green;'>${ret}</font>`;
            }

            return ret;
        },

        showTeacherMenu: (userRole) => {
            if(userRole == 'teacher' || userRole == 'admin') {
                var nav = '<a href="/test/create">Utwórz test</a>'
                nav += '<a href="/test/list">Lista testów</a>';

                return nav;
            }
        },

        calculatePoints: (userPoints, allPoints) => {
            return `${userPoints / allPoints * 100}%`;
        }
    };

    if(Handlebars && typeof Handlebars.registerHelper === "function") {
        for (var prop in helpers) {
            Handlebars.registerHelper(prop, helpers[prop]);
        }
    }
    else {
        return helpers;
    }

};

module.exports.register = register;
module.exports.helpers = register(null);