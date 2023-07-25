const filesRouter = require("express").Router();
const filesController = require("../../controllers/user/files.controller");
const {
  UserAuthorization
} = require('../../middlewares/authorization')
const {
  body,
  param,
  check
} = require("express-validator");
const multer = require("multer");
const {
  storageFileApplication
} = require("../../helpers/multerStorage.helper");
const upload = multer({
  storage: storageFileApplication,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      // console.log('File should be an image or pdf')
      cb({
        status: 400,
        message: 'File should be an image or pdf'
      }, false);
    }
  },
});

filesRouter.post("/",
  UserAuthorization,
  upload.single('file'),
  (req, res, next) => {
    req.body.file = req.file.filename
    next()
  },
  [
    body("application_id").notEmpty().withMessage("Application Id is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("file").notEmpty().withMessage("File is required"),
  ],
  filesController.store
);

filesRouter.put("/:id",
  UserAuthorization,
  upload.single('file'),
  (req, res, next) => {
    req.body.file = req.file.filename
    next()
  },
  [
    param("id").isInt().withMessage("File id must be an integer"),
    body("application_id").notEmpty().withMessage("Application Id is required"),
    body("name").notEmpty().withMessage("Name is required"),
    body("file").notEmpty().withMessage("File is required"),
  ],
  filesController.update
);

filesRouter.delete("/:id",
  UserAuthorization,
  [
    param("id").isInt().withMessage("File id must be an integer")
  ],
  filesController.delete
);

module.exports = filesRouter;