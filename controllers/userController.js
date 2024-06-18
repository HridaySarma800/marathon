import db from "../models/index.js";
import { getToken } from "../middleware/auth.js";
import twilio from "twilio";
import GlobalResponse from "../models/global_response.js";
const accountSid = process.env.TWILLIO_ACCOUNT_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
import errors from '../exceptions/errors.js';

const { ClientError, UnauthorizedError, ForbiddenError, NotFoundError, ServerError } = errors;
const User = db.users;

const validate = async (req, res) => {
  const { otp, phone } = req.body;
  try {
    const verifiedResponse = await client.verify.v2
      .services(process.env.TWILLIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+91${phone}`,
        code: otp,
      });

    const user = await User.findOne({
      where: {
        phone: phone,
      },
    }).catch((err) => {
      throw new NotFoundError("Account with this number does not exist.");
    });
    // TODO: It should be user. Remove the not (!) operator.
    if (user) {
      let token = getToken(user);
      console.log(token.toString());
      res.cookie("accessToken", token, {
        maxAge: 24 * 60 * 60,
        httpOnly: true,
      });
      res.status(200).send(
        new GlobalResponse(true, "OTP verified successfully", {
          smsData: verifiedResponse,
          userData: user,
        })
      );
    } else {
      throw new NotFoundError("Account with this number does not exist.");
    }
  } catch (err) {
    throw new ServerError(err.message);
  }
};
const requestOTP = async (req, res) => {
  try {
    const phone = req.body.phone;
    const user = await User.findOne({
      where: {
        phone: phone,
      },
    }).catch((err) => {
      throw new NotFoundError("Account with this number does not exist.");
    });
    // TODO: It should be user. Remove the not (!) operator.
    if (user) {
      client.verify.v2
        .services(process.env.TWILLIO_SERVICE_SID)
        .verifications.create({
          to: `+91${phone}`,
          channel: "sms",
        })
        .then((verification) => {
          let response = new GlobalResponse(true, "OTP sent successfully", {
            phone: verification.to,
          });
          return res.status(200).send(response);
        });
    } else {
      return res.status(401).send(
        new GlobalResponse(true, "Account with this number does not exist.", {
          phone: verification.to,
        })
      );
    }
  } catch (error) {
    throw new ServerError(err.message);
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
          "User created successfully.",
          data
        );
        return res.status(201).json(response);
      })
      .catch((err) => {
        throw new ClientError(err.message);
      });
  } catch (err) {
    throw new ServerError(err.message);
  }
  next();
};
export default {
  requestOTP,
  validate,
  registerUser,
};
