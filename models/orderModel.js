// orderModel.js
export default (sequelize, DataTypes) => {
    const Order = sequelize.define(
      'orders',
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
        },
        productId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id',
          },
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        timestamps: true,
        tableName: 'orders',
      }
    );
    Order.sync();
    return Order;
  };
  