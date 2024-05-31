// Define the User model

module.exports = (sequelize, DataTypes) => {
    // Define the User model with three fields: userName, email, and password
    // Return the defined model
    const User = sequelize.define("users", {
            // Define the userName field as a non-nullable string
            userId:{
                type: DataTypes.STRING,
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false // The userName field must have a value
            },
            // Define the email field as a unique, non-nullable string that must be a valid email format
            role: {
                type: DataTypes.STRING,
            }
        },
        {
            // Automatically add timestamp fields (createdAt and updatedAt) to the model
            timestamps: true,
            tableName: 'users',
        });
    User.sync({force:true});
    return User;
};
