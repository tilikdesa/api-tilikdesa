const {
    Users,
    Ecourts,
} = require('../../models')
const {
    validationResult
} = require("express-validator");

class EcourtsController {
    // Get All Data
    static async list(req, res, next) {
        try {
            const ecourts = await Ecourts.findAll({
                include: [{
                    model: Users,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }]
            })

            if (ecourts[0]) {
                res.status(200).json(ecourts)
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
                    id: req.params.id
                },
                include: [{
                    model: Users,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }]
            })

            if (!ecourts) {
                throw {
                    status: 404,
                    message: 'Data Not Found'
                }
            } else {
                res.status(200).json(ecourts)
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

            const ecourts = await Ecourts.findOne({
                where: {
                    user_id: req.body.user_id
                }
            })

            if (ecourts) {
                throw {
                    status: 401,
                    message: 'Data already exists!'
                }
            } else {
                await Ecourts.create({
                    user_id: req.body.user_id,
                    username: req.body.username,
                    password: req.body.password,
                });

                res.status(201).json({
                    message: 'Succesfully Created!'
                })
            }
        } catch (err) {
            next(err)
        }
    }

    // Update data ecourt
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

            const ecourts = await Ecourts.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!ecourts) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                await Ecourts.update({
                    user_id: req.body.user_id,
                    username: req.body.username,
                    password: req.body.password,
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

    // Delete data ecourt
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

            const ecourts = await Ecourts.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!ecourts) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                await Ecourts.destroy({
                    where: {
                        id: req.params.id
                    }
                })

                res.status(201).json({
                    message: 'Succesfully Deleted!'
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = EcourtsController;