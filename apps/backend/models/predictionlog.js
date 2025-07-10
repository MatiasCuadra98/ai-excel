const { DataTypes } = require('sequelize');

// PredictionLog model: stores logs of AI predictions for auditing/debugging
module.exports = (sequelize) => {
  const PredictionLog = sequelize.define('PredictionLog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prediction: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'prediction_logs',
    updatedAt: false,
    paranoid: true, // Enable soft deletes
  });
  return PredictionLog;
};
