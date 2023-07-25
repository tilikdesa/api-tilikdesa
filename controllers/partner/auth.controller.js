const {
    Partners
} = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
    validationResult
} = require("express-validator");

class AuthController {
    static async postLogin(req, res, next) {
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
                }
            })

            if (!partners) {
                throw {
                    status: 401,
                    message: "Invalid username or password"
                }
            }

            if (bcrypt.compareSync(req.body.password, partners.password)) {
                const token = jwt.sign({
                    id: partners.id,
                    username: partners.username
                }, process.env.MY_JWT_TOKEN)

                res.status(200).json({
                    token
                })
            } else {
                throw {
                    status: 401,
                    message: "Invalid username or password"
                }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = AuthController