const {
    Op
} = require('sequelize');
const {
    Sessions,
    Employees,
    Applications,
} = require('../../models');
const {
    validationResult
} = require('express-validator');

class SessionsController {
    // Get All Data
    static async list(req, res, next) {
        try {
            const sessions = await Sessions.findAll({
                where: {
                    [Op.and]: [{
                        '$Application.user_id$': req.user.id
                    }]
                },
                include: [{
                    model: Employees,
                    as: 'Judge',
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }, {
                    model: Applications,
                    attributes: ['user_id']
                }]
            })

            if (sessions[0]) {
                res.status(200).json(sessions)
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

    // Get detail data session
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

            const sessions = await Sessions.findOne({
                where: {
                    [Op.and]: [{
                        id: req.params.id
                    }, {
                        '$Application.user_id$': req.user.id
                    }]
                },
                include: [{
                    model: Employees,
                    as: 'Judge',
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }, {
                    model: Applications,
                    attributes: ['user_id']
                }]
            })

            if (!sessions) {
                throw {
                    status: 404,
                    message: 'Data Not Found'
                }
            } else {
                res.status(200).json(sessions)
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = SessionsController;