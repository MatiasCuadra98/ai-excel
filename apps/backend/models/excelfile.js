const { DataTypes } = require('sequelize');

// ExcelFile model: stores uploaded Excel files and their versions
module.exports = (sequelize) => {
  const ExcelFile = sequelize.define('ExcelFile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  }, {
    tableName: 'excel_files',
    timestamps: true,
    paranoid: true, // Enable soft deletes
  });
  return ExcelFile;
};
