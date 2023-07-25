const employeesRouter = require("express").Router();
const employeesController = require("../../controllers/employee/employees.controller");
const {
    AdminAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");

// Get All Data & Search Employee
employeesRouter.get("/",
    AdminAuthorization,
    employeesController.list
);

employeesRouter.get("/:id",
    AdminAuthorization,
    [
        param("id").isInt().withMessage("Employee id must be an integer")
    ],
    employeesController.getById
);

employeesRouter.post("/",
    AdminAuthorization,
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
    employeesController.store
);

employeesRouter.put("/:id",
    AdminAuthorization,
    [
        param("id").isInt().withMessage("Employee id must be an integer"),
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
    employeesController.update
);

employeesRouter.delete("/:id",
    AdminAuthorization,
    [
        param("id").isInt().withMessage("Employee id must be an integer")
    ],
    employeesController.delete
);

module.exports = employeesRouter;