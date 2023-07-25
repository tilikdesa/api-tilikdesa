const {
    Employees
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
            } else {
                const employees = await Employees.findOne({
                    where: {
                        username: req.body.username
                    }
                })

                if (!employees) {
                    throw {
                        status: 401,
                        message: "Username is not registered!"
                    }
                } else {
                    if (bcrypt.compareSync(req.body.password, employees.password)) {
                        const token = jwt.sign({
                            id: employees.id,
                            username: employees.username
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
                }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = AuthController