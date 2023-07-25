const {
    Applications,
    Users,
    Files,
    Sessions
} = require('../../models')
const {
    validationResult
} = require("express-validator");
const {
    Op
} = require('sequelize');

class ApplicationsController {
    // Get all data
    static async list(req, res, next) {
        try {
            const applications = await Applications.findAll({
                where: {
                    [Op.and]: [{
                            user_id: req.user.id
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
                }]
            })

            if (applications[0]) {
                res.status(200).json(applications)
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

    // Get Detail Data
    static async getById(req, res, next) {
        try {
            const applications = await Applications.findOne({
                where: {
                    [Op.and]: [{
                            id: req.params.id
                        },
                        {
                            user_id: req.user.id
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

            await Applications.create({
                user_id: req.user.id,
                title: req.body.title,
                status: 0,
            })

            res.status(201).json({
                message: 'Succesfully Added!'
            })
        } catch (err) {
            next(err)
        }
    }

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

            const applications = await Applications.findOne({
                where: {
                    [Op.and]: [{
                            id: req.params.id
                        }, {
                            user_id: req.user.id
                        },
                        {
                            status: {
                                [Op.not]: 'deleted'
                            }
                        }
                    ]
                },
            })

            if (!applications) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                await Applications.update({
                    title: req.body.title
                }, {
                    where: {
                        id: req.params.id
                    }
                })

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
                        }, {
                            user_id: req.user.id
                        },
                        {
                            status: {
                                [Op.not]: 'deleted'
                            }
                        }
                    ]
                },
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
                    message: 'Succesfully Deleted!'
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ApplicationsController;