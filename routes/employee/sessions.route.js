const sessionsRouter = require("express").Router();
const sessionsController = require("../../controllers/employee/sessions.controller");
const multer = require("multer");
const {
    EmployeeAuthorization
} = require('../../middlewares/authorization')
const {
    body,
    param
} = require("express-validator");
const {
    storageFileDecision
} = require("../../helpers/multerStorage.helper");
const upload = multer({
    storage: storageFileDecision,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("File should be an image or pdf"), false);
        }
    },
});

// Get All Data & Search Session
sessionsRouter.get("/",
    EmployeeAuthorization,
    sessionsController.list
);

// Get Detail
sessionsRouter.get("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Session id must be an integer")
    ],
    sessionsController.getById
);

// Create data
sessionsRouter.post("/",
    EmployeeAuthorization,
    [
        body("application_id").notEmpty().withMessage("Application Id is required"),
        body("judge_id").notEmpty().withMessage("Judge Id is required"),
        body("register_date").notEmpty().withMessage("Register Date is required"),
        body("case_number").notEmpty().withMessage("Case Number is required"),
        body("case_schedule").notEmpty().withMessage("Case Schedule is required"),
        body("session_location").notEmpty().withMessage("Session Location is required"),
    ],
    sessionsController.store
);

// Update data
sessionsRouter.put("/:id",
    EmployeeAuthorization,
    upload.single('file_decision'),
    [
        body("application_id").notEmpty().withMessage("Application Id is required"),
        body("judge_id").notEmpty().withMessage("Judge Id is required"),
        body("register_date").notEmpty().withMessage("Register Date is required"),
        body("case_number").notEmpty().withMessage("Case Number is required"),
        body("case_schedule").notEmpty().withMessage("Case Schedule is required"),
        body("session_location").notEmpty().withMessage("Session Location is required"),
    ],
    sessionsController.update
);

// Delete sessions
sessionsRouter.delete("/:id",
    EmployeeAuthorization,
    [
        param("id").isInt().withMessage("Session id must be an integer")
    ],
    sessionsController.delete
);

module.exports = sessionsRouter;