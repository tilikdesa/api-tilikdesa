const {
    Queues,
    Employees,
    Users
} = require('../../models')
const {
    validationResult
} = require("express-validator");
const {
    Op
} = require('sequelize');

class QueuesController {
    // Get All Data
    static async list(req, res, next) {
        try {
            const queues = await Queues.findAll({
                where: {
                    employee_id: req.employee.id
                },
                include: [{
                        model: Users,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    },
                    {
                        model: Employees,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    }
                ]
            })

            if (queues[0]) {
                res.status(200).json(queues)
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
            const queues = await Queues.findOne({
                where: {
                    [Op.and]: [{
                            id: req.params.id
                        },
                        {
                            employee_id: req.employee.id
                        },
                    ]
                },
                include: [{
                        model: Users,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    },
                    {
                        model: Employees,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    }
                ]
            })

            if (!queues) {
                throw {
                    status: 404,
                    message: 'Queue Not Found'
                }
            } else {
                res.status(200).json(queues)
            }
        } catch (err) {
            next(err)
        }
    }

    // Edit Status Data
    static async updateStatus(req, res, next) {
        try {
            // Validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw {
                    status: 400,
                    message: errors.array()[0].msg,
                };
            }

            const queues = await Queues.findOne({
                where: {
                    [Op.and]: [{
                            id: req.params.id
                        },
                        {
                            employee_id: req.employee.id
                        },
                    ]
                },
            })

            if (!queues) {
                throw {
                    status: 404,
                    message: 'Queue not found!'
                }
            } else {
                await Queues.update({
                    status: req.body.status
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
}

module.exports = QueuesController;