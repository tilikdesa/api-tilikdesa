const queuesRouter = require("express").Router();
const queuesController = require("../../controllers/user/queues.controller");
const {
    UserAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");


// Get All Data & Search Queue
queuesRouter.get("/",
    UserAuthorization,
    queuesController.list
);

// Get Detail Data
queuesRouter.get("/:id",
    UserAuthorization,
    [
        param("id").isInt().withMessage("Queue id must be an integer")
    ],
    queuesController.getById
);

// Create Queue
queuesRouter.post("/",
    UserAuthorization,
    [
        body("employee_id").notEmpty().withMessage("Employee id is required"),
        body("number_queue").notEmpty().withMessage("Number Queue is required"),
        body("title").notEmpty().withMessage("Title is required"),
    ],
    queuesController.store
);

module.exports = queuesRouter;