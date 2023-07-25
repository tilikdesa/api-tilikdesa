const sharing_applicationsRouter = require("express").Router();
const sharing_applicationsController = require("../../controllers/employee/sharing_applications.controller");
const {
    EmployeeAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");

// Get All Data & Search Sharing Application
sharing_applicationsRouter.get("/",
    EmployeeAuthorization,
    sharing_applicationsController.list
);

// Get Detail
sharing_applicationsRouter.get("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Sharing Application Id must be an integer")
    ],
    sharing_applicationsController.getById
);

// Create Data
sharing_applicationsRouter.post("/",
    EmployeeAuthorization,
    [
        body("application_id").notEmpty().withMessage("Application Id is required"),
        body("partner_id").notEmpty().withMessage("Partner Id is required"),
    ],
    sharing_applicationsController.store
);

// Update Data
sharing_applicationsRouter.put("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Sharing Application Id must be an integer"),
        body("application_id").notEmpty().withMessage("Application Id is required"),
        body("partner_id").notEmpty().withMessage("Partner Id is required"),
    ],
    sharing_applicationsController.update
);

// Delete Data
sharing_applicationsRouter.delete("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Sharing Application Id must be an integer")
    ],
    sharing_applicationsController.delete
);

module.exports = sharing_applicationsRouter;