import db from "../models/index.js";
import getToken from "../middleware/auth.js";
import twilio from "twilio";
import GlobalResponse from "../models/global_response.js";
const accountSid = process.env.TWILLIO_ACCOUNT_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const User = db.users;

const validate = async (req, res) => {
  const { otp, phone } = req.body;
  try {
    const verifiedResponse = await client.verify.v2
      .services(process.env.TWILLIO_SERVICE_SID)
      .verificationChecks.create({
        to: "+916000280524",
        code: otp,
      });

    const user = await User.findOne({
      where: {
        phone: phone,
      },
    });
    if (user) {
      let token = getToken(user);
      res.cookie("accessToken", token, {
        maxAge: 24 * 60 * 60,
        httpOnly: true,
      });
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
};

const requestOTP = async (req, res) => {
  try {
    client.verify.v2
      .services(process.env.TWILLIO_SERVICE_SID)
      .verifications.create({
        to: "+916000280524",
        channel: "sms",
        code: OTP.toString(),
      })
      .then((verification) => console.log(verification.sid));
    return res.status(200).send("Otp sent");
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      dob,
      aadhar,
      phone,
      secondaryPhone,
      permanentAddress,
      correspondenceAddress,
      pincode,
      state,
      role,
    } = req.body;

    const data = {
      firstName,
      lastName,
      dob,
      isActive: true,
      aadhar,
      aadharVerified: false,
      phone,
      phoneVerified: false,
      secondaryPhone,
      secondaryPhoneVerified: false,
      permanentAddress,
      correspondenceAddress,
      pincode,
      state,
      role,
    };

    await User.create(data)
      .then((data) => {
        const response = new GlobalResponse(
          true,
          "User created successfully",
          data
        );
        return res.status(201).json(response);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "An error occurred " + err });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred " + err });
    next();
  }
};
export default {
  requestOTP,
  validate,
  registerUser,
};
