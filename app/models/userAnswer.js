module.exports = function(sequelize, Sequelize) {

	var UserAnswer = sequelize.define('userAnswer', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		answer: {type: Sequelize.ENUM('a','b','c','d')},
		idQuestion : {type: Sequelize.INTEGER},
		idUser : {type: Sequelize.INTEGER}
	});

	return UserAnswer;
}