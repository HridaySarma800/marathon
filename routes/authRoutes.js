import express from "express";
import userController from "../controllers/userController.js";
const { validate, requestOTP, registerUser } = userController;

const router = express.Router();

router.get("/otp", requestOTP);
// router.post('/validate',validate)
router.post("/validate", validate);

router.post("/register", registerUser);

export default router;
