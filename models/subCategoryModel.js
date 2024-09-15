export default (sequelize, DataTypes) => {
  const SubCategory = sequelize.define(
    'subcategories',
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
      imageUrl: {
        type: DataTypes.STRING,
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
    },
    {
      timestamps: true,
      tableName: 'subcategories',
    }
  );
  SubCategory.sync();
  return SubCategory;
};
