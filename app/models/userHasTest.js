module.exports = function(sequelize, Sequelize) {

	var UserHasTest = sequelize.define('userHasTest', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		idUser : {type: Sequelize.INTEGER},
		idTest : {type: Sequelize.INTEGER},
		status: {type: Sequelize.ENUM('true','false'),defaultValue:'false' }
	});

	return UserHasTest;
}