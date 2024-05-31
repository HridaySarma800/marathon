// Define the User model

module.exports = (sequelize, DataTypes) => {
    // Define the User model with three fields: userName, email, and password
    // Return the defined model
    return sequelize.define("user", {
            // Define the userName field as a non-nullable string
            userName: {
                type: DataTypes.STRING,
                allowNull: false // The userName field must have a value
            },
            // Define the email field as a unique, non-nullable string that must be a valid email format
            email: {
                type: DataTypes.STRING,
                unique: true, // The email field must have a unique value (no duplicates)
                isEmail: true, // Validate that the email field contains a valid email format
                allowNull: false // The email field must have a value
            },
            // Define the password field as a non-nullable string
            password: {
                type: DataTypes.STRING,
                allowNull: false // The password field must have a value
            },
            role: {
                type: DataTypes.STRING,
            }
        },
        {
            // Automatically add timestamp fields (createdAt and updatedAt) to the model
            timestamps: true
        });
};
