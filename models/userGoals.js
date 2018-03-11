module.exports = function(sequelize, DataTypes){
    var UserGoals = sequelize.define("UserGoals",{
        runningFor: DataTypes.STRING,
        goal: DataTypes.INTEGER,
        finishedGoal: DataTypes.BOOLEAN
    });
    return UserGoals;
}