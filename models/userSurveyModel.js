module.exports = function(sequelize, DataTypes){
    var UserSurvey = sequelize.define("UserSurvey",{
        answer1: DataTypes.INTEGER,
        answer2: DataTypes.INTEGER,
        answer3a: DataTypes.INTEGER,
        answer3b: DataTypes.INTEGER,
        answer3c: DataTypes.INTEGER,
        answer3d: DataTypes.INTEGER,
        answer3e: DataTypes.INTEGER,
        answer3f: DataTypes.INTEGER,
        answer3g: DataTypes.INTEGER,
        answer3h: DataTypes.INTEGER,
        answer4: DataTypes.INTEGER,
        answer5: DataTypes.INTEGER,
        answer6: DataTypes.INTEGER,
        answer7: DataTypes.INTEGER,
        answer8: DataTypes.INTEGER,
        answer9: DataTypes.INTEGER,
        answer10: DataTypes.INTEGER
    });
    return UserSurvey;
}