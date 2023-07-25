const historiesRouter = require("express").Router();
const historiesController = require("../../controllers/employee/histories.controller");
const {
    EmployeeAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");


// Get All Data & Search History
historiesRouter.get("/",
    EmployeeAuthorization,
    historiesController.list
);

historiesRouter.get("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("History id must be an integer")
    ],
    historiesController.getById
);

historiesRouter.post("/",
    EmployeeAuthorization,
    [
        body("user_id").notEmpty().withMessage("User Id is required"),
        body("type").notEmpty().withMessage("Type is required"),
        body("description").notEmpty().withMessage("Description is required"),
    ],
    historiesController.store
);

module.exports = historiesRouter;