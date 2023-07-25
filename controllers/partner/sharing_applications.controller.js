const {
    Op
} = require('sequelize');
const {
    Sharing_Applications,
    Applications,
    Files,
    Users,
    Sessions,
    // Partners,
} = require('../../models')
const {
    validationResult
} = require("express-validator");

class Sharing_ApplicationsController {
    // Get All Data
    static async list(req, res, next) {
        try {
            const sharing_applications = await Sharing_Applications.findAll({
                where: {
                    partner_id: req.partner.id
                },
                attributes: ['id', 'createdAt', 'updatedAt'],
                include: [{
                    model: Applications,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }]
            })

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
                    [Op.and]: [{
                            partner_id: req.partner.id
                        },
                        {
                            id: req.params.id
                        }
                    ]
                },
                attributes: ['id', 'createdAt', 'updatedAt'],
                include: [{
                    model: Applications,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [{
                            model: Users,
                            attributes: {
                                exclude: ['password', 'createdAt', 'updatedAt']
                            }
                        },
                        {
                            model: Files,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        },
                        {
                            model: Sessions,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt']
                            }
                        },
                    ]
                }]
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
}

module.exports = Sharing_ApplicationsController;