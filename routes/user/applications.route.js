const applicationsRouter = require("express").Router();
const applicationsController = require("../../controllers/user/applications.controller");
const {
    UserAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");

// Get All Data & Search Application
applicationsRouter.get("/",
    UserAuthorization,
    applicationsController.list
);

// Get Detail 
applicationsRouter.get("/:id",
    UserAuthorization,
    [
        param("id").isInt().withMessage("Application id must be an integer")
    ],
    applicationsController.getById
);

// Create Data
applicationsRouter.post("/",
    UserAuthorization,
    [
        body("title").notEmpty().withMessage("Title is required"),
    ],
    applicationsController.store
);

// Update Data
applicationsRouter.put("/:id",
    UserAuthorization,
    [
        param("id").isInt().withMessage("Application id must be an integer"),
        body("title").notEmpty().withMessage("Title is required"),
    ],
    applicationsController.update
);

// Delete Data 
applicationsRouter.delete("/:id",
    UserAuthorization,
    [
        param("id").isInt().withMessage("Application id must be an integer")
    ],
    applicationsController.delete
);
module.exports = applicationsRouter;