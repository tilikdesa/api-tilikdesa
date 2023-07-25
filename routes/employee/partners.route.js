const partnersRouter = require("express").Router();
const partnersController = require("../../controllers/employee/partners.controller");
const {
    EmployeeAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");

// Get All Data & Search Partner
partnersRouter.get("/",
    EmployeeAuthorization,
    partnersController.list
);

// Get Detail
partnersRouter.get("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Partner id must be an integer")
    ],
    partnersController.getById
);

// Create Data
partnersRouter.post("/",
    EmployeeAuthorization,
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
        body("institution").notEmpty().withMessage("Institution is required"),
    ],
    partnersController.store
);

// Update Data
partnersRouter.put("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Partner id must be an integer"),
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
        body("institution").notEmpty().withMessage("Institution is required"),
    ],
    partnersController.update
);

// Delete Data
partnersRouter.delete("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Partner id must be an integer")
    ],
    partnersController.delete
);

module.exports = partnersRouter;