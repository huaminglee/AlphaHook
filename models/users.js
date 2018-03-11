module.exports = function(sequelize, DataTypes){
    var Users = sequelize.define("Users",{
        username: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        password: DataTypes.STRING

    });
    // methods ======================
    return Users;
}