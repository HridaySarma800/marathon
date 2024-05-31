//importing modules
const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require('uuid'); // Import UUID generator
const accountSid = 'AC3d1896738a6cbec443b4b9d02a8ba396';
const authToken = '11dcd4ab4cfaa4a11f43df364573711b';
const client = require('twilio')(accountSid, authToken);

// Assigning users to the variable User
const User = db.users;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
    try {
        const {phone, role} = req.body;
        let userId;
        let isUnique = false;
        while (!isUnique) {
            userId = uuidv4();
            // Check if the generated UUID already exists in the database
            const existingUser = await User.findOne({where: {userId: userId}});
            if (!existingUser) {
                isUnique = true; // Set flag to true if UUID is unique
            }
        }
        const data = {
            userId,
            phone,
            role
        };
        //saving the user
        const user = await User.create(data);
        //if user details is captured
        //generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        if (user) {
            let token = getToken(user);
            res.cookie("jwt", token, {maxAge: 24 * 60 * 60, httpOnly: true});
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            //send users details
            return res.status(201).send(user);
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};


//login authentication

const login = async (req, res) => {
    try {
        const {phone, password} = req.body;

        //find a user by their email
        const user = await User.findOne({
            where: {
                phone: phone
            }
        });
        //if user email is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            //if password is the same
            //generate token with the user's id and the secretKey in the env file

            if (isSame) {
                let token = getToken(user);
                //if password matches wit the one in the database
                //go ahead and generate a cookie for the user
                res.cookie("jwt", token, {maxAge: 24 * 60 * 60, httpOnly: true});
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                //send user data
                return res.status(200).send(user);
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};

const requestOTP = async (req,res) =>{
    try{
        client.verify.v2.services("VA821bb18e56d0e3c63c9cf4f8d8fbb94a")
            .verifications
            .create({to: '+918399811340', channel: 'sms',code:'111111'})
            .then(verification => console.log(verification.sid));
        return res.status(200).send("Otp sent");
    }catch (error){
        console.log(error);
    }
}

function getToken(user) {
    return jwt.sign({id: user.id}, process.env.SECRET_KEY, {
        expiresIn: 24 * 60 * 60 * 1000,
    });
}

module.exports = {
    signup,
    login,
    requestOTP
};
