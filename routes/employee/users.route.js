const usersRouter = require("express").Router();
const usersController = require("../../controllers/employee/users.controller");
const {
    EmployeeAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");


// Get All Data & Search User
usersRouter.get("/",
    EmployeeAuthorization,
    usersController.list
);

usersRouter.get("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("User id must be an integer")
    ],
    usersController.getById
);

module.exports = usersRouter;