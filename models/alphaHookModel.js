module.exports = function(sequelize, DataTypes){
    var UserProfile = sequelize.define("UserProfile",{
        name: DataTypes.STRING,
        middleName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        dob:DataTypes.DATE
    });
  //  UserProfile.hasMany(UserSurvey, { foreignKey: 'id' }); // Set one to many relationship
    return UserProfile;
}



