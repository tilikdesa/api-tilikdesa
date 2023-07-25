const {
    Roles,
} = require('../../models')
const {
    validationResult
} = require("express-validator");

class RolesController {
    // Get All Data
    static async list(req, res, next) {
        try {
            const roles = await Roles.findAll()

            if (roles[0]) {
                res.status(200).json(roles)
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

    // Get detail data roles
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

            const roles = await Roles.findOne({
                where: {
                    id: req.params.id
                },
            })

            if (!roles) {
                throw {
                    status: 404,
                    message: 'Data Not Found'
                }
            } else {
                res.status(200).json(roles)
            }
        } catch (err) {
            next(err)
        }
    }

    // create data roles
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

            await Roles.create({
                role_type: req.body.role_type,
            });

            res.status(201).json({
                message: 'Succesfully Created!'
            })
        } catch (err) {
            next(err)
        }
    }

    // Update data roles
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

            const roles = await Roles.findOne({
                where: {
                    id: req.params.id
                },
            })

            if (!roles) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                // Update role_type
                await Roles.update({
                    role_type: req.body.role_type,
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

    // Delete data roles
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

            const roles = await Roles.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!roles) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                await Roles.destroy({
                    where: {
                        id: req.params.id
                    }
                })
            }

            res.status(200).json({
                message: 'Succesfully Deleted!'
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = RolesController;