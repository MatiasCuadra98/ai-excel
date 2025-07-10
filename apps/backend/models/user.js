const { DataTypes } = require('sequelize');

// User model: stores user credentials
module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'users',
    timestamps: true,
    paranoid: true, // Enable soft deletes
  });

  // Define associations
  User.associate = function(models) {
    // User has many Excel files
    User.hasMany(models.ExcelFile, {
      foreignKey: 'userId',
      as: 'excelFiles'
    });

    // User has many prompts (chat history)
    User.hasMany(models.Prompt, {
      foreignKey: 'userId',
      as: 'prompts'
    });

    // User has many prediction logs
    User.hasMany(models.PredictionLog, {
      foreignKey: 'userId',
      as: 'predictionLogs'
    });
  };

  return User;
};
