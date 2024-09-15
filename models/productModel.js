export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'products',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      mrp: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      sellingPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discountPercentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      subCategoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'subcategories',
          key: 'id',
        },
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      video: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      tableName: 'products',
    }
  );
  Product.sync();
  return Product;
};
