const usersRouter = require("express").Router();
const usersController = require("../../controllers/user/users.controller");
const {
    UserAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");

usersRouter.get("/",
    UserAuthorization,
    usersController.getDetail
);

usersRouter.put("/",
    UserAuthorization,
    [
        body("fullname").notEmpty().withMessage("Fullname is required"),
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
        body("contact_number").notEmpty().withMessage("Contact Number is required"),
        body("place_of_birth").notEmpty().withMessage("Place Of Birth is required"),
        body("birth_date").notEmpty().withMessage("Birth Date is required"),
        body("gender").notEmpty().withMessage("Gender is required"),
        body("status").notEmpty().withMessage("Status is required"),
        body("job").notEmpty().withMessage("Job is required"),
        body("nationality").notEmpty().withMessage("Nationality is required"),
        body("address").notEmpty().withMessage("Address is required"),
    ],
    usersController.update
);

module.exports = usersRouter;