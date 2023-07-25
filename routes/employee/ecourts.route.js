const ecourtsRouter = require("express").Router();
const ecourtsController = require("../../controllers/employee/ecourts.controller");
const {
    EmployeeAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");


// Get All Data & Search Ecourt
ecourtsRouter.get("/",
    EmployeeAuthorization,
    ecourtsController.list
);

// Get Detail
ecourtsRouter.get("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Ecourt id must be an integer")
    ],
    ecourtsController.getById
);

// Create Data
ecourtsRouter.post("/",
    EmployeeAuthorization,
    [
        body("user_id").notEmpty().withMessage("User Id is required"),
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    ecourtsController.store
);

// Update Data
ecourtsRouter.put("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Ecourt id must be an integer"),
        body("user_id").notEmpty().withMessage("User Id is required"),
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    ecourtsController.update
);

// Delete Data
ecourtsRouter.delete("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Ecourt id must be an integer")
    ],
    ecourtsController.delete
);

module.exports = ecourtsRouter;