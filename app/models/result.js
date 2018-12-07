module.exports = function(sequelize, Sequelize) {

	var Result = sequelize.define('result', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		result : {type: Sequelize.STRING},
		idUser : {type: Sequelize.INTEGER},
		idTest : {type: Sequelize.INTEGER}
	});

	return Result;
}