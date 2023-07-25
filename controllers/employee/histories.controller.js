const {
    Users,
    Histories,
} = require('../../models')
const {
    validationResult
} = require("express-validator");
const fs = require("fs");

class HistoriesController {
    // Get All Data
    static async list(req, res, next) {
        try {
            const histories = await Histories.findAll({
                include: [{
                    model: Users,
                    attributes: {
                        exclude: ['password']
                    }
                }]
            })
            res.status(200).json(histories)
        } catch (err) {
            next(err)
        }
    }

    // Get detail data ecourt
    static async getById(req, res, next) {
        try {
            const histories = await Histories.findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: Users,
                    attributes: {
                        exclude: ['password']
                    }
                }]
            })

            if (!histories) {
                throw {
                    status: 404,
                    message: 'Data Not Found'
                }
            } else {
                res.status(200).json(histories)
            }
        } catch (err) {
            next(err)
        }
    }

    // create data ecourt
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

            await Histories.create({
                user_id: req.user.id,
                type: req.body.type,
                description: req.body.description,
            });

            res.status(201).json({
                message: 'Succesfully Created!'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = HistoriesController;