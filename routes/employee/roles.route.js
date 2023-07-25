const rolesRouter = require("express").Router();
const rolesController = require("../../controllers/employee/roles.controller");
const {
    EmployeeAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");


// Get All Data & Search Role
rolesRouter.get("/",
    EmployeeAuthorization,
    rolesController.list
);

// Get by Id
rolesRouter.get("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Role id must be an integer")
    ],
    rolesController.getById
);

// Create Role
rolesRouter.post("/",
    EmployeeAuthorization,
    [
        body("role_type").notEmpty().withMessage("Role Type is required"),
    ],
    rolesController.store
);

// Update Role
rolesRouter.put("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Role id must be an integer"),
        body("role_type").notEmpty().withMessage("Role Type is required"),
    ],
    rolesController.update
);

// Delete Role
rolesRouter.delete("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Role id must be an integer")
    ],
    rolesController.delete
);

module.exports = rolesRouter;