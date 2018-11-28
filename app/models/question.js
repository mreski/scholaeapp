module.exports = function(sequelize, Sequelize) {

	var Question = sequelize.define('question', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		question: { type: Sequelize.TEXT,notEmpty: true},
		ansA: { type: Sequelize.TEXT,notEmpty: true},
		ansB: { type: Sequelize.TEXT,notEmpty: true},
		ansC: { type: Sequelize.TEXT,notEmpty: true},
		ansD: { type: Sequelize.TEXT,notEmpty: true},
		correct: {type: Sequelize.ENUM('a','b','c','d')},
		points : {type: Sequelize.INTEGER},
		idTest : {type: Sequelize.INTEGER}
	});

	return Question;
}