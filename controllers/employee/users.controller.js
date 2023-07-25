const {
    Users
} = require('../../models')

// This function must have 'Admin'
class UsersController {
    static async list(req, res, next) {
        try {
            const users = await Users.findAll({
                attributes: {
                    exclude: ['password']
                }
            })

            if (users[0]) {
                res.status(200).json(users)
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

    static async getById(req, res, next) {
        try {
            const users = await Users.findOne({
                where: {
                    id: req.params.id
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
}

module.exports = UsersController