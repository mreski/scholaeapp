var register = function(Handlebars) {
    var helpers = {
        answerIsEqual: function(arg1, arg2, ret, options) {
            if(arg1 == arg2) {
                return `<font style='color: green;'>${ret}</font>`;
            }

            return ret;
        }
    };

    if (Handlebars && typeof Handlebars.registerHelper === "function") {
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