const { DataTypes } = require('sequelize');

// Image model: stores image metadata and AWS URL
module.exports = (sequelize) => {
  const Image = sequelize.define('Image', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    awsUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'images',
    timestamps: true,
    paranoid: true, // Enable soft deletes
  });
  return Image;
};
