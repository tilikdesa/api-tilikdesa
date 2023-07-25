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
                    user_id: req.user.id
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

    // Get Data By Id
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
            const queues = await Queues.findOne({
                where: {
                    [Op.and]: [{
                            id: req.params.id
                        },
                        {
                            user_id: req.user.id
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

    // Add Queue
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

            await Queues.create({
                user_id: req.user.id,
                employee_id: req.body.employee_id,
                number_queue: req.body.number_queue,
                title: req.body.title,
                status: 0
            })

            res.status(201).json({
                message: 'Succesfully Added!'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = QueuesController;