import express from "express";
const router = express.Router();
import authorize from "../middleware/auth.js";
import appController from "../controllers/appController.js";
const { getSidebarItems } = appController;


router.get("/sidebarItems", getSidebarItems);

export default router;