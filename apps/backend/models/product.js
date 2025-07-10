const { DataTypes } = require('sequelize');

// Product model: each row in the Excel, associated with an image and category
module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    excelFileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'products',
    timestamps: true,
    paranoid: true, // Enable soft deletes
  });
  return Product;
};
