const {
    Op
} = require('sequelize');
const {
    Sharing_Applications,
    Applications,
    Partners,
} = require('../../models')
const {
    validationResult
} = require("express-validator");

class Sharing_ApplicationsController {
    // Get All Data
    static async list(req, res, next) {
        try {
            const sharing_applications = await Sharing_Applications.findAll()

            if (sharing_applications[0]) {
                res.status(200).json(sharing_applications)
            } else {
                res.status(404).json({
                    status: 404,
                    message: "Data Empty"
                });
            }
        } catch (err) {
            next(err)
        }
    }

    // Get detail data sharing_applications
    static async getById(req, res, next) {
        try {
            // Validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw {
                    status: 400,
                    message: errors.array()[0].msg,
                };
            }

            const sharing_applications = await Sharing_Applications.findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                        model: Partners,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    },
                    {
                        model: Applications,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                ]
            })

            if (!sharing_applications) {
                throw {
                    status: 404,
                    message: 'Data Not Found'
                }
            } else {
                res.status(200).json(sharing_applications)
            }
        } catch (err) {
            next(err)
        }
    }

    // create data sharing_applications
    static async store(req, res, next) {
        try {
            // Validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw {
                    status: 400,
                    message: errors.array()[0].msg,
                };
            }

            const sharing_applications = await Sharing_Applications.findOne({
                where: {
                    [Op.and]: [{
                        application_id: req.body.application_id,
                    }, {
                        partner_id: req.body.partner_id,
                    }]
                }
            });

            // Tidak boleh ada application dan partner duplicate 
            if (sharing_applications) {
                throw {
                    status: 401,
                    message: 'Application and Partner already exists!'
                }
            } else {
                await Sharing_Applications.create({
                    application_id: req.body.application_id,
                    partner_id: req.body.partner_id,
                });

                res.status(201).json({
                    message: 'Successfully Created!'
                })
            }
        } catch (err) {
            next(err)
        }
    }

    // Update data sharing_applications
    static async update(req, res, next) {
        try {
            // Validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw {
                    status: 400,
                    message: errors.array()[0].msg,
                };
            }

            const sharing_applications = await Sharing_Applications.findOne({
                where: {
                    id: req.params.id
                },
            })

            if (!sharing_applications) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                const findIdentity = await Sharing_Applications.findOne({
                    where: {
                        [Op.and]: [{
                            application_id: req.body.application_id,
                        }, {
                            partner_id: req.body.partner_id,
                        }]
                    }
                });

                // Checking similarity identity data
                if (findIdentity) {
                    if (findIdentity.application_id != sharing_applications.application_id || findIdentity.partner_id != sharing_applications.partner_id) {
                        throw {
                            status: 401,
                            message: 'Application and Partner already exists!'
                        }
                    }
                }

                // Update Sharing Application
                await Sharing_Applications.update({
                    application_id: req.body.application_id,
                    partner_id: req.body.partner_id,
                }, {
                    where: {
                        id: req.params.id
                    }
                });

                res.status(200).json({
                    message: 'Successfully Updated!'
                })
            }
        } catch (err) {
            next(err)
        }
    }

    // Delete data sharing_applications
    static async delete(req, res, next) {
        try {
            // Validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw {
                    status: 400,
                    message: errors.array()[0].msg,
                };
            }

            const sharing_applications = await Sharing_Applications.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!sharing_applications) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                await Sharing_Applications.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            }

            res.status(200).json({
                message: 'Successfully Deleted!'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Sharing_ApplicationsController;