const {
    Files,
    Applications
} = require('../../models')
const {
    validationResult
} = require("express-validator");
const {
    Op
} = require("sequelize");
const fs = require("fs");

class FilesController {
    static async store(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw {
                    status: 400,
                    message: errors.array()[0].msg,
                };
            }

            const findApplications = await Applications.findOne({
                where: {
                    [Op.and]: [{
                        id: req.body.application_id
                    }, {
                        user_id: req.user.id
                    }, {
                        status: {
                            [Op.not]: 'deleted'
                        }
                    }]
                }
            })

            if (!findApplications) {
                // Delete temporary file 
                const DIR = 'public/application_file/' + req.file.filename;
                if (fs.existsSync(DIR)) {
                    fs.unlinkSync(DIR)
                }

                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {

                if (req.file) {
                    req.body.file = `${process.env.BASE_URL}application_file/${req.file.filename}`
                }

                await Files.create({
                    application_id: req.body.application_id,
                    name: req.body.name,
                    file: req.body.file,
                })

                res.status(201).json({
                    message: 'Successfully Added!'
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw {
                    status: 400,
                    message: errors.array()[0].msg,
                };
            }

            const files = await Files.findOne({
                where: {
                    [Op.and]: [{
                        id: req.params.id
                    }, {
                        application_id: req.body.application_id
                    }, {
                        '$Application.user_id$': req.user.id
                    }, {
                        [Op.not]: {
                            '$Application.status$': 'deleted'
                        }
                    }]
                },
                include: {
                    model: Applications
                }
            })

            if (!files) {
                // Delete temporary file 
                const DIR = 'public/application_file/' + req.file.filename;
                if (fs.existsSync(DIR)) {
                    fs.unlinkSync(DIR)
                }

                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                if (req.file) {
                    req.body.file = `${process.env.BASE_URL}application_file/${req.file.filename}`
                }

                await Files.update({
                    name: req.body.name,
                    file: req.body.file
                }, {
                    where: {
                        id: req.params.id
                    }
                })

                // Delete File
                if (files.file) {
                    const DIR = 'public/application_file/' + files.file.split(`${process.env.BASE_URL}application_file/`)[1]
                    if (fs.existsSync(DIR)) {
                        fs.unlinkSync(DIR)
                    }
                }

                res.status(200).json({
                    message: 'Succesfully Updated!'
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw {
                    status: 400,
                    message: errors.array()[0].msg,
                };
            } else {
                const files = await Files.findOne({
                    where: {
                        id: req.params.id
                    },
                    include: {
                        model: Applications
                    }
                })

                if (!files) {
                    throw {
                        status: 404,
                        message: 'Data not found!'
                    }
                } else {
                    // Check identity user
                    if (files.Application.user_id != req.user.id) {
                        throw {
                            status: 401,
                            message: "Unauthorized",
                        };
                    }
                    await Files.destroy({
                        where: {
                            id: req.params.id
                        }
                    })

                    // Delete File
                    if (files.file) {
                        const DIR = 'public/application_file/' + files.file.split(`${process.env.BASE_URL}application_file/`)[1]
                        if (fs.existsSync(DIR)) {
                            fs.unlinkSync(DIR)
                        }
                    }
                }

                res.status(200).json({
                    message: 'Succesfully Deleted!'
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = FilesController;