const ecourtsRouter = require("express").Router();
const ecourtsController = require("../../controllers/user/ecourts.controller");
const {
    UserAuthorization
} = require('../../middlewares/authorization')

// Get Detail
ecourtsRouter.get("/",
    UserAuthorization,
    ecourtsController.getById
);

module.exports = ecourtsRouter;