import express from "express";
import userController from "../controllers/userController.js";
const { validate, requestOTP, registerUser } = userController;
import { asyncHandler } from "../middleware/asyncHandler.js";
const router = express.Router();
import authorize from "../middleware/auth.js";
import Roles from "../middleware/auth.js";

router.post("/requestOtp", [], asyncHandler(requestOTP));

router.post("/verifyOtp", [], asyncHandler(validate));

router.post(
  "/registerDirector",
  authorize(Roles.Director),
  asyncHandler(registerUser)
);

router.post(
  "/registerAdmin",
  authorize(Roles.Director),
  asyncHandler(registerUser)
);

router.post(
  "/registerManager", 
  authorize(Roles.Director, Roles.Admin),
  asyncHandler(registerUser)
);

router.post(
  "/registerTransporter",
  authorize(Roles.Director, Roles.Admin),
  asyncHandler(registerUser)
);

router.post("/registerUser", [], registerUser);

export default router;
