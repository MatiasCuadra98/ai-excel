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

  // Define associations
  Image.associate = function(models) {
    // Image has many products (one image can be associated with multiple products)
    Image.hasMany(models.Product, {
      foreignKey: 'imageId',
      as: 'products'
    });

    // Image has many prediction logs
    Image.hasMany(models.PredictionLog, {
      foreignKey: 'imageId',
      as: 'predictionLogs'
    });
  };

  return Image;
};
