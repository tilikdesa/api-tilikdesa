const {
    Partners
} = require('../../models')
const {
    validationResult
} = require("express-validator");

// This function must have 'User'
class PartnersController {
    static async getDetail(req, res, next) {
        try {
            const partners = await Partners.findOne({
                where: {
                    id: req.partner.id
                }
            })

            if (!partners) {
                throw {
                    status: 404,
                    message: 'User Not Found'
                }
            } else {
                res.status(200).json({
                    id: partners.id,
                    username: partners.username,
                    institution: partners.institution,
                    created_at: partners.created_at,
                    updated_at: partners.updated_at,
                })
            }
        } catch (err) {
            next(err)
        }
    }

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
                    id: req.partner.id
                }
            })

            if (!partners) {
                throw {
                    status: 404,
                    message: 'User not found!'
                }
            } else {
                const findIdentity = await Partners.findOne({
                    where: {
                        username: req.body.username
                    }
                })

                // Checking similarity username
                if (findIdentity.username != partners.username) {
                    throw {
                        status: 400,
                        message: 'Username already exists!'
                    }
                }

                await Partners.update({
                    username: partners.username,
                    password: partners.password,
                    institution: partners.institution,
                }, {
                    where: {
                        id: req.partner.id
                    }
                })

                res.status(200).json({
                    message: 'User Succesfully Updated!'
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = PartnersController