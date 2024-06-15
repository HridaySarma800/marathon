import db from "../Models/index.js";
import getToken from "../middleware/auth.js";
import { v4 as uuidv4 } from "uuid";
import twilio from "twilio";

const accountSid = process.env.TWILLIO_ACCOUNT_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const User = db.users;
let OTP = "";

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

const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dob,
      aadhar,
      verified,
      phone,
      secondaryPhone,
      permanentAddress,
      correspondenceAddress,
      pincode,
      state,
      role,
    } = req.body;
    let id;
    let tid;
    let isUniqueUUID = false;
    let isUniqueTID = false;
    while (!isUniqueUUID) {
      id = uuidv4();
      const existingUser = await User.findOne({ where: { id: id } });
      if (!existingUser) {
        isUniqueUUID = true;
      }
    }
    while (!isUniqueTID) {
      tid = uuidv4();
      const existingUser = await User.findOne({ where: { tid: tid } });
      if (!existingUser) {
        isUniqueTID = true;
      }
    }
    const data = {
      id,
      firstName,
      lastName,
      dob,
      isActive: true,
      aadhar,
      aadharVerified,
      phone,
      phoneVerified,
      secondaryPhone,
      secondaryPhoneVerified,
      pAddress,
      cAddress,
      pincode,
      state,
      tid,
      role,
    };

    const user = await User.create(data);

    if (user) {
      return res.status(201).send({
        message: "User created successfully",
        data: data,
      });
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred" });
  }
};

export default {
  requestOTP,
  validate,
};


