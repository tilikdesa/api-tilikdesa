const sessionsRouter = require("express").Router();
const sessionsController = require("../../controllers/user/sessions.controller");
const {
    UserAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");

// Get All Data & Search Session
sessionsRouter.get("/",
    UserAuthorization,
    sessionsController.list
);

sessionsRouter.get("/:id",
    UserAuthorization,
    [
        param("id").isInt().withMessage("Session id must be an integer")
    ],
    sessionsController.getById
);

module.exports = sessionsRouter;