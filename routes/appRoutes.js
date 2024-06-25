import express from "express";
const router = express.Router();
import authorize from "../middleware/auth.js";
import appController from "../controllers/appController.js";
const { getSidebarItems } = appController;
import Roles from "../middleware/auth.js";

router.get("/sidebarItems", authorize([Roles.Director]), getSidebarItems);

export default router;
