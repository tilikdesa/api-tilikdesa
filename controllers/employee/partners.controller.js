const {
    Partners,
} = require('../../models')
const {
    validationResult
} = require("express-validator");

class PartnersController {
    // Get All Data
    static async list(req, res, next) {
        try {
            const partners = await Partners.findAll()

            if (partners[0]) {
                res.status(200).json(partners)
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

    // Get detail data partners
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

            const partners = await Partners.findOne({
                where: {
                    id: req.params.id
                },
            })

            if (!partners) {
                throw {
                    status: 404,
                    message: 'Data Not Found'
                }
            } else {
                res.status(200).json(partners)
            }
        } catch (err) {
            next(err)
        }
    }

    // create data partners
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

            const partners = await Partners.findOne({
                where: {
                    username: req.body.username
                },
            })

            if (partners) {
                throw {
                    status: 401,
                    message: 'Username already exists!'
                }
            } else {
                await Partners.create({
                    username: req.body.username,
                    password: req.body.password,
                    institution: req.body.institution
                });

                res.status(201).json({
                    message: 'Succesfully Created!'
                })
            }
        } catch (err) {
            next(err)
        }
    }

    // Update data partners
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

            const partners = await Partners.findOne({
                where: {
                    id: req.params.id
                },
            })

            if (!partners) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                const findIdentity = await Partners.findOne({
                    where: {
                        username: req.body.username
                    }
                })

                // Checking similarity username
                if (findIdentity) {
                    if (findIdentity.username != partners.username) {
                        throw {
                            status: 400,
                            message: 'Username already exists!'
                        }
                    }
                }

                // Update Partner
                await Partners.update({
                    username: req.body.username,
                    password: req.body.password,
                    institution: req.body.institution
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

    // Delete data partners
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

            const partners = await Partners.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!partners) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                await Partners.destroy({
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

module.exports = PartnersController;