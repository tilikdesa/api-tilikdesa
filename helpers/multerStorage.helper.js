const multer = require("multer");
const fs = require("fs");

const storageFileDecision = multer.diskStorage({
    destination: function (req, file, cb) {
        if (fs.existsSync("public/decision_file/")) {
            cb(null, "public/decision_file");
        } else {
            fs.mkdirSync("public/decision_file", {
                recursive: true
            });
            cb(null, "public/decision_file");
        }
    },
    filename: function (req, file, cb) {
        file.originalname = file.originalname.replaceAll(" ", "-");
        // const uniqueSuffix = Date.now() + "-" + file.originalname;
        const uniqueSuffix = Date.now() + ".pdf";
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
const storageFileApplication = multer.diskStorage({
    destination: function (req, file, cb) {
        if (fs.existsSync("public/application_file/")) {
            cb(null, "public/application_file");
        } else {
            fs.mkdirSync("public/application_file", {
                recursive: true
            });
            cb(null, "public/application_file");
        }
    },
    filename: function (req, file, cb) {
        file.originalname = file.originalname.replaceAll(" ", "-");
        // const uniqueSuffix = Date.now() + "-" + file.originalname;
        const uniqueSuffix = Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

module.exports = {
    storageFileDecision,
    storageFileApplication
};