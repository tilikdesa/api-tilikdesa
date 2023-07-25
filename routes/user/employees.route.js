const employeesRouter = require("express").Router();
const employeesController = require("../../controllers/user/employees.controller");
const {
    UserAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");

// Get All Data & Search Employee
employeesRouter.get("/",
    UserAuthorization,
    employeesController.list
);

employeesRouter.get("/:id",
    UserAuthorization,
    [
        param("id").isInt().withMessage("Employee id must be an integer")
    ],
    employeesController.getById
);

module.exports = employeesRouter;