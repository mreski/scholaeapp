module.exports = function(sequelize, Sequelize) {

	var Test = sequelize.define('test', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		name: { type: Sequelize.STRING,notEmpty: true},
		description: { type: Sequelize.TEXT,notEmpty: true},
		owner : {type: Sequelize.INTEGER}
	});

	return Test;
}