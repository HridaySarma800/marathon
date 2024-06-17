export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
      },
      aadhar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        isNumeric: true,
      },
      secondaryPhone: {
        type: DataTypes.STRING,
        allowNull: true,
        isNumeric: true,
      },
      pAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pincode: {
        type: DataTypes.STRING,
        allowNull: true,
        isNumeric: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "users",
    }
  );
  User.sync();
  return User;
};
