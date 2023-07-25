const queuesRouter = require("express").Router();
const queuesController = require("../../controllers/employee/queues.controller");
const {
    EmployeeAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");


// Get All Data & Search Queue
queuesRouter.get("/",
    EmployeeAuthorization,
    queuesController.list
);

// Get Detail Data 
queuesRouter.get("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Queue id must be an integer")
    ],
    queuesController.getById
);

// Edit Status Data
queuesRouter.put("/update-status/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Queue id must be an integer"),
        body("status").notEmpty().withMessage("Status is required"),
    ],
    queuesController.updateStatus
);

module.exports = queuesRouter;