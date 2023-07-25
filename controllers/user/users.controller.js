const {
    Users
} = require('../../models')
const {
    validationResult
} = require("express-validator");
const fs = require("fs");

// This function must have 'User'
class UsersController {
    static async getDetail(req, res, next) {
        try {
            const users = await Users.findOne({
                where: {
                    id: req.user.id
                }
            })

            if (!users) {
                throw {
                    status: 404,
                    message: 'User Not Found'
                }
            } else {
                res.status(200).json({
                    id: users.id,
                    nik: users.nik,
                    email: users.email,
                    fullname: users.fullname,
                    username: users.username,
                    contact_number: users.contact_number,
                    place_of_birth: users.place_of_birth,
                    birth_date: users.birth_date,
                    gender: users.gender,
                    status: users.status,
                    job: users.job,
                    nationality: users.nationality,
                    address: users.address,
                    created_at: users.created_at,
                    updated_at: users.updated_at,
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

            const users = await Users.findOne({
                where: {
                    id: req.user.id
                }
            })

            if (!users) {
                throw {
                    status: 404,
                    message: 'User not found!'
                }
            } else {
                const findIdentity = await Users.findOne({
                    where: {
                        username: req.body.username
                    }
                })

                // Checking similarity username
                if (findIdentity.username != users.username) {
                    throw {
                        status: 400,
                        message: 'Username already exists!'
                    }
                }

                await Users.update({
                    fullname: req.body.fullname,
                    username: req.body.username,
                    password: req.body.password,
                    contact_number: req.body.contact_number,
                    place_of_birth: req.body.place_of_birth,
                    birth_date: req.body.birth_date,
                    gender: req.body.gender,
                    status: req.body.status,
                    job: req.body.job,
                    nationality: req.body.nationality,
                    address: req.body.address,
                }, {
                    where: {
                        id: req.user.id
                    }
                })

                res.status(200).json({
                    message: 'Users Succesfully Updated!'
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UsersController