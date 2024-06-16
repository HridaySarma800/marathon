import db from "../models/index.js";
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

const registerUser = async (req, res, next) => {
  try {
    console.log(req.body);
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

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Date of Birth:", dob);
    console.log("Aadhar:", aadhar);
    console.log("Phone:", phone);
    console.log("Secondary Phone:", secondaryPhone);
    console.log("Permanent Address:", permanentAddress);
    console.log("Correspondence Address:", correspondenceAddress);
    console.log("Pincode:", pincode);
    console.log("State:", state);
      
    const id = uuidv4();
    const tid = uuidv4();
    console.log("id:", id);
    console.log("tid:", tid);
    const data = {
      id,
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
      tid,
      role,
    };

    const user = await User.create(data).then((data) => {
      console.log(data.toJSON());
    });
    if (user) {
      return res.status(201).send({
        message: "User created successfully",
        data: data,
      });
    } else {
      console.log("Details are not correct");
      return res.status(409).send("Details are not correct");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "An error occurred" });
    next();
  }
};
export default {
  requestOTP,
  validate,
  registerUser,
};
