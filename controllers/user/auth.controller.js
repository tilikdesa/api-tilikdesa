const {
    Users
} = require('../../models')
const {
    Op
} = require("sequelize");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
    validationResult
} = require("express-validator");
const fs = require("fs");

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

            const users = await Users.findOne({
                where: {
                    username: req.body.username
                }
            })

            if (!users) {
                throw {
                    status: 401,
                    message: "Invalid username or password"
                }
            }

            if (bcrypt.compareSync(req.body.password, users.password)) {
                const token = jwt.sign({
                    id: users.id,
                    username: users.username
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

    static async register(req, res, next) {
        try {
            // Validation
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw {
                    status: 400,
                    message: errors.array()[0].msg,
                };
            }

            const users = await Users.findOne({
                where: {
                    [Op.or]: [{
                            nik: req.body.nik
                        },
                        {
                            email: req.body.email
                        },
                        {
                            username: req.body.username
                        }
                    ]
                }
            })

            if (users) {
                throw {
                    status: 400,
                    message: 'NIK, Email or Username  already exists!'
                }
            } else {
                await Users.create({
                    nik: req.body.nik,
                    email: req.body.email,
                    fullname: req.body.fullname,
                    username: req.body.username,
                    password: req.body.password
                })

                res.status(201).json({
                    message: 'Register Succesfully'
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = AuthController