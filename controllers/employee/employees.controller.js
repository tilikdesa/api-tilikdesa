const {
    Op
} = require('sequelize');
const {
    Employees,
    Roles,
} = require('../../models')
const {
    validationResult
} = require("express-validator");

class employeesController {
    // Get All Data
    static async list(req, res, next) {
        try {
            const employees = await Employees.findAll({
                where: {
                    status: {
                        [Op.not]: 'Deleted'
                    }
                },
                include: [{
                    model: Roles,
                    attributes: ['id', 'role_type']
                }]
            })

            if (employees[0]) {
                res.status(200).json(employees)
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

    // Get detail data employees
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

            const employees = await Employees.findOne({
                where: {
                    [Op.and]: [{
                        id: req.params.id
                    }, {
                        status: {
                            [Op.not]: 'Deleted'
                        }
                    }]
                },
                include: [{
                    model: Roles,
                    attributes: ['id', 'role_type']
                }]
            })

            if (!employees) {
                throw {
                    status: 404,
                    message: 'Data Not Found'
                }
            } else {
                res.status(200).json(employees)
            }
        } catch (err) {
            next(err)
        }
    }

    // create data employees
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

            const employees = await Employees.findOne({
                where: {
                    [Op.or]: [{
                            identity_number: req.body.identity_number
                        },
                        {
                            username: req.body.username
                        }
                    ]
                },
            })

            if (employees) {
                throw {
                    status: 401,
                    message: 'Identity Number Or Username already exists!'
                }
            }

            await Employees.create({
                role_id: req.body.role_id,
                identity_number: req.body.identity_number,
                fullname: req.body.fullname,
                username: req.body.username,
                password: req.body.password,
                birth_date: req.body.birth_date,
                last_education: req.body.last_education,
                department: req.body.department,
                class: req.body.class
            });

            res.status(201).json({
                message: 'Succesfully Created!'
            })
        } catch (err) {
            next(err)
        }
    }

    // Update data employees
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

            const employees = await Employees.findOne({
                where: {
                    [Op.and]: [{
                            id: req.params.id
                        },
                        {
                            status: {
                                [Op.not]: 'Deleted'
                            }
                        }
                    ]
                },
            })

            if (!employees) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                const findIdentity = await Employees.findOne({
                    where: {
                        [Op.or]: [{
                                identity_number: req.body.identity_number
                            },
                            {
                                username: req.body.username
                            }
                        ]
                    }
                });

                // Checking similarity identity data
                if (findIdentity.identity_number != employees.identity_number || findIdentity.username != employees.username) {
                    throw {
                        status: 401,
                        message: 'Identity Number Or Username already exists!'
                    }
                }

                await Employees.update({
                    role_id: req.body.role_id,
                    identity_number: req.body.identity_number,
                    fullname: req.body.fullname,
                    username: req.body.username,
                    password: req.body.password,
                    birth_date: req.body.birth_date,
                    last_education: req.body.last_education,
                    department: req.body.department,
                    class: req.body.class
                }, {
                    where: {
                        id: req.params.id
                    }
                });

                res.status(200).json({
                    message: 'Succesfully Updated!'
                })
            }
        } catch (err) {
            next(err)
        }
    }

    // Delete data employees
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

            const employees = await Employees.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!employees) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                await Employees.update({
                    status: 'Deleted'
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

module.exports = employeesController;