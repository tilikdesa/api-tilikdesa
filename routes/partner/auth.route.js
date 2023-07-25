const authRouter = require("express").Router();
const AuthController = require("../../controllers/partner/auth.controller");
const {
    body
} = require("express-validator");

// Login and Get Token for Partnership
authRouter.post(
    "/login",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    AuthController.postLogin
);

module.exports = authRouter;