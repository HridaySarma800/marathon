import db from "../models/index.js";
import { getToken } from "../middleware/auth.js";
import twilio from "twilio";
import GlobalResponse from "../models/global_response.js";
const accountSid = process.env.TWILLIO_ACCOUNT_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
import errors from "../exceptions/errors.js";

const {
  ClientError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ServerError,
} = errors;
const User = db.users;

const validate = async (req, res) => {
  try {
    const { otp, phone } = req.body;
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
    });

    if (!user) {
      throw new NotFoundError("Account with this number does not exist.");
    }

    let token = getToken(user);
    res.cookie("accessToken", token, {
      maxAge: 24 * 60 * 60,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).send(
      new GlobalResponse(true, "OTP verified successfully", {
        smsData: verifiedResponse,
        userData: user,
      })
    );
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(new GlobalResponse(false, err.message));
    } else if (err instanceof ServerError) {
      res.status(500).send(new GlobalResponse(false, err.message));
    } else {
      res.status(400).send(new GlobalResponse(false, err.message));
    }
  }
};

const requestOTP = async (req, res) => {
  try {
    const phone = req.body.phone;
    const user = await User.findOne({
      where: {
        phone: phone,
      },
    });

    if (!user) {
      throw new NotFoundError("Account with this number does not exist.");
    }

    client.verify.v2
      .services(process.env.TWILLIO_SERVICE_SID)
      .verifications.create({
        to: `+91${phone}`,
        channel: "sms",
      })
      .then((verification) => {
        let response = new GlobalResponse(true, "OTP sent to +91"+phone, {
          phone: verification.to,
        });
        res.status(200).send(response);
      })
      .catch((err) => {
        throw new ServerError(err.message);
      });
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).send(new GlobalResponse(false, err.message));
    } else if (err instanceof ServerError) {
      res.status(500).send(new GlobalResponse(false, err.message));
    } else {
      res.status(400).send(new GlobalResponse(false, err.message));
    }
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
        res.status(201).json(response);
      })
      .catch((err) => {
        throw new ClientError(err.message);
      });
  } catch (err) {
    if (err instanceof ClientError) {
      res.status(400).send(new GlobalResponse(false, err.message));
    } else if (err instanceof ServerError) {
      res.status(500).send(new GlobalResponse(false, err.message));
    } else {
      res.status(500).send(new GlobalResponse(false, err.message));
    }
  }
  next();
};

export default {
  requestOTP,
  validate,
  registerUser,
};