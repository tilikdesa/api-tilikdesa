const {
    Applications,
    Users,
    Files,
    Sessions,
    Ecourts,
} = require('../../models')
const {
    validationResult
} = require("express-validator");
const {
    Op
} = require('sequelize');

class ApplicationsController {
    static async list(req, res, next) {
        try {
            const {
                count,
                rows
            } = await Applications.findAndCountAll({
                include: [{
                    model: Users,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }],
                where: {
                    status: {
                        [Op.not]: 'deleted'
                    }
                },
            })

            if (!count) {
                res.status(404).json({
                    status: 404,
                    message: "Data Empty"
                });
            } else {
                res.status(200).json(rows)
            }
        } catch (err) {
            next(err)
        }
    }

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

            const applications = await Applications.findOne({
                where: {
                    [Op.and]: [{
                            id: req.params.id
                        },
                        {
                            status: {
                                [Op.not]: 'deleted'
                            }
                        }
                    ]
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
            })

            if (!applications) {
                throw {
                    status: 404,
                    message: 'Data Not Found'
                }
            } else {
                res.status(200).json(applications)
            }
        } catch (err) {
            next(err)
        }
    }

    static async createCaseNumber(req, res, next) {
        try {
            // Validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw {
                    status: 400,
                    message: errors.array()[0].msg,
                };
            }

            const sessions = await Sessions.findOne({
                where: {
                    application_id: req.params.application_id
                }
            })

            if (!sessions) {
                throw {
                    status: 404,
                    message: 'Data not found! Don`t forget create Sessions'
                }
            } else {
                await Sessions.update({
                    case_number: req.body.case_number
                }, {
                    where: {
                        application_id: req.params.application_id
                    }
                })

                res.status(200).json({
                    message: 'Successfully Created!'
                })
            }

        } catch (err) {
            next(err)
        }
    }

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

            const applications = await Applications.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!applications) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                await Applications.update({
                    status: 'deleted'
                }, {
                    where: {
                        id: req.params.id
                    }
                })

                res.status(200).json({
                    message: 'Successfully Deleted!'
                })
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = ApplicationsController;