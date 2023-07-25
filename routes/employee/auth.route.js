const authRouter = require("express").Router();
const AuthController = require("../../controllers/employee/auth.controller");
const {
    body
} = require("express-validator");

authRouter.post(
    "/login",
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    AuthController.postLogin
);

module.exports = authRouter;