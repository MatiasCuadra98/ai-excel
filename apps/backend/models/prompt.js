const { DataTypes } = require('sequelize');

// Prompt model: stores user prompts and responses
module.exports = (sequelize) => {
  const Prompt = sequelize.define('Prompt', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'prompts',
    timestamps: true,
    paranoid: true, // Enable soft deletes
  });

  // Define associations
  Prompt.associate = function(models) {
    // Prompt belongs to User
    Prompt.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Prompt;
};
