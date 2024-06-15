const db = require("../Models");
const jwt = require("jsonwebtoken");
require('dotenv').config({path:'./env'});

const accountSid = process.env.TWILLIO_ACCOUNT_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const User = db.users;
let OTP = "";

const validate = async (req, res) => {
    const {otp, phone} = req.body;
    try {

        const verifiedResponse = await client.verify
            .v2.services(process.env.TWILLIO_SERVICE_SID)
            .verificationChecks.create(
                {
                    to: "+916000280524",
                    code: otp
                }
            )
        const user = await User.findOne({
            where: {
                phone: phone
            }
        });
        if (user) {
            let token = getToken(user);
            res.cookie("jwt", token, {maxAge: 24 * 60 * 60, httpOnly: true});
            res.status(200).send(`{
            smsData:${JSON.stringify(verifiedResponse)}          ,
            userData: ${user}
        }`);
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (err) {
        console.log(err);
    }

}

const requestOTP = async (req, res) => {
    try {
        client.verify.v2.services(process.env.TWILLIO_SERVICE_SID)
            .verifications
            .create({to: '+916000280524', channel: 'sms', code: OTP.toString()})
            .then(verification => console.log(verification.sid));
        return res.status(200).send("Otp sent");
    } catch (error) {
        console.log(error);
    }
}

function getToken(user) {
    return jwt.sign({id: user.id}, process.env.SECRET_KEY, {
        expiresIn: 24 * 60 * 60 * 1000,
    });
}


module.exports = {
    requestOTP,
    validate
};


