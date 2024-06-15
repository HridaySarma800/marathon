import express from "express";
import userController from "../controllers/userController.js";
const { validate, requestOTP, signup } = userController;

const router = express.Router();

router.get("/otp", requestOTP);
// router.post('/validate',validate)
router.post("/validate", validate);

export default router;
