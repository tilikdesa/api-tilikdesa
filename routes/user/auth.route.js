const authRouter = require("express").Router();
const AuthController = require("../../controllers/user/auth.controller");
const {
    body
} = require("express-validator");

authRouter.post(
    "/register",
    [
        body("nik")
        .isInt().withMessage("NIK must be an integer")
        .notEmpty().withMessage("NIK is required"),
        body("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Please fill a valid email")
        .notEmpty()
        .withMessage("Email is required"),
        body("fullname").notEmpty().withMessage("Fullname is required"),
        body("username").notEmpty().withMessage("username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    AuthController.register
);

authRouter.post(
    "/login",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    AuthController.postLogin
);

module.exports = authRouter;