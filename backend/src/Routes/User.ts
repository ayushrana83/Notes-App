import express from "express";
import { loginController, logoutController, signUpController } from "../Controller/User";
const router : express.Router = express.Router();


router.route("/login").post(loginController);
router.route("/signup").post(signUpController);
router.route("/logout").post(logoutController);


export default router;