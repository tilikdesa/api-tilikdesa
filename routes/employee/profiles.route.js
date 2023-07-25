const profilesRouter = require("express").Router();
const profilesController = require("../../controllers/employee/profiles.controller");
const {
    EmployeeAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");

// Get Detail
profilesRouter.get("/",
    EmployeeAuthorization,
    profilesController.getById
);

// Update Profile
profilesRouter.put("/",
    EmployeeAuthorization,
    [
        body("role_id").notEmpty().withMessage("Role Id is required"),
        body("identity_number").notEmpty().withMessage("Identity Number is required"),
        body("fullname").notEmpty().withMessage("Fullname is required"),
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
        body("birth_date").notEmpty().withMessage("Birth Date is required"),
        body("last_education").notEmpty().withMessage("Last Education is required"),
        body("department").notEmpty().withMessage("Department is required"),
        body("class").notEmpty().withMessage("Class is required"),
    ],
    profilesController.update
);

module.exports = profilesRouter;