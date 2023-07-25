const sharing_applicationsRouter = require("express").Router();
const sharing_applicationsController = require("../../controllers/partner/sharing_applications.controller");
const {
    PartnerAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");

// Get All Data & Search Sharing Application
sharing_applicationsRouter.get("/",
    PartnerAuthorization,
    sharing_applicationsController.list
);

// Get Detail
sharing_applicationsRouter.get("/:id",
    PartnerAuthorization,
    [
        param("id").isInt().withMessage("Sharing Application Id must be an integer")
    ],
    sharing_applicationsController.getById
);

module.exports = sharing_applicationsRouter;