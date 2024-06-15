// Define the User model

export default (sequelize, DataTypes) => {
  // Define the User model with three fields: userName, email, and password
  // Return the defined model
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false, // The userName field must have a value
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false, // The userName field must have a value
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // The userName field must have a value
      },
      aadhar: {
        type: DataTypes.STRING,
        allowNull: false, // The userName field must have a value
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false, // The userName field must have a value
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false, // The userName field must have a value
      },
      secondaryPhone: {
        type: DataTypes.STRING,
        allowNull: true, // The userName field must have a value
      },
      pAddress: {
        type: DataTypes.STRING,
        allowNull: true, // The userName field must have a value
      },
      cAddress: {
        type: DataTypes.STRING,
        allowNull: true, // The userName field must have a value
      },
      pincode: {
        type: DataTypes.STRING,
        allowNull: true, // The userName field must have a value
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true, // The userName field must have a value
      },
      tid: {
        type: DataTypes.STRING,
        allowNull: false,
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
  User.sync({ force: true });
  return User;
};
