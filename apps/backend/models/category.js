const { DataTypes } = require('sequelize');

// Category model: stores product categories (e.g., Jeans, Jacket, T-shirt)
module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'categories',
    timestamps: true,
    paranoid: true, // Enable soft deletes
  });
  return Category;
};
