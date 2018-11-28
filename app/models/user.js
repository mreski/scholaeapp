module.exports = function(sequelize, Sequelize) {

	var User = sequelize.define('user', {
		id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
		firstname: { type: Sequelize.STRING,notEmpty: true},
		lastname: { type: Sequelize.STRING,notEmpty: true},
		email: { type:Sequelize.STRING, validate: {isEmail:true} },
		password : {type: Sequelize.STRING,allowNull: false }, 
		class : {type: Sequelize.STRING}, 
		group : {type: Sequelize.STRING},
		role: {type: Sequelize.ENUM('student','teacher'),defaultValue:'student' },
		status: {type: Sequelize.ENUM('active','inactive'),defaultValue:'active' }
	});

	return User;
}