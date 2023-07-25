const {
    Op
} = require('sequelize');
const {
    Employees,
    Roles,
} = require('../../models');
const {
    validationResult
} = require('express-validator');

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
}

module.exports = employeesController;