const applicationsRouter = require("express").Router();
const applicationsController = require("../../controllers/employee/applications.controller");
const {
    EmployeeAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");


// Get All Data & Search Application
applicationsRouter.get("/",
    EmployeeAuthorization,
    applicationsController.list
);

// Get Detail Application
applicationsRouter.get("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Application id must be an integer")
    ],
    applicationsController.getById
);

// Create Case Number
applicationsRouter.put("/createCaseNumber/:application_id",
    EmployeeAuthorization,
    [
        param("application_id").isInt().withMessage("Application id must be an integer"),
        body("case_number").notEmpty().withMessage("Case Number is required"),
    ],
    applicationsController.createCaseNumber
);

// Delete Applications
applicationsRouter.delete("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Application id must be an integer")
    ],
    applicationsController.delete
);

module.exports = applicationsRouter;