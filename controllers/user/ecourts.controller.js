const {
    validationResult
} = require('express-validator');
const {
    Users,
    Ecourts,
} = require('../../models');
const {
    Op
} = require('sequelize');

class EcourtsController {
    // Get detail data ecourt
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

            const ecourts = await Ecourts.findOne({
                where: {
                    user_id: req.user.id
                },
                include: [{
                    model: Users,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }]
            })

            if (!ecourts) {
                res.status(404).json({
                    status: 404,
                    message: "Data Empty"
                });
            } else {
                res.status(200).json(ecourts)
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = EcourtsController;