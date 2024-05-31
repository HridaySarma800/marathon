// Importing required modules
const express = require("express");
const db = require("../Models");

// Assigning the 'users' model from the db object to the User variable
const User = db.users;

// Function to check if the username or email already exists in the database
// This is to avoid having two users with the same username or email.
const saveUser = async (req, res, next) => {
    try {
        // Search the database to see if the username exists.
        const phone = await User.findOne({
            where: {
                phone: req.body.phone,
            },
        });
        // If the username exists in the database, respond with a status of 409 (Conflict).
        if (phone) {
            return res.status(409).send("Username already taken");
        }
        // Check if the email already exists in the database
        const emailCheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        // If the email exists in the database, respond with a status of 409 (Conflict)
        if (emailCheck) {
            return res.status(409).send("Email already registered");
        }
        // If both username and email are unique, proceed to the next middleware function
        next();
    } catch (error) {
        // Log any errors that occur during the database queries
        console.log(error);
        // Respond with a status of 500 (Internal Server Error) in case of an error
        return res.status(500).send("An error occurred while checking user information");
    }
};

// Exporting the saveUser function as a module
module.exports = {
    saveUser,
};
