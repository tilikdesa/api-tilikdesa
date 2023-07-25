const partnersRouter = require("express").Router();
const partnersController = require("../../controllers/partner/partners.controller");
const {
    PartnerAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");

partnersRouter.get("/",
    PartnerAuthorization,
    partnersController.getDetail
);

partnersRouter.put("/",
    PartnerAuthorization,
    [
        body("username").notEmpty().withMessage("Username is required"),
        body("password").notEmpty().withMessage("Password is required"),
        body("institution").notEmpty().withMessage("institution is required"),
    ],
    partnersController.update
);

module.exports = partnersRouter;