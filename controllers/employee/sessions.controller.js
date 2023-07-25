const {
    Applications,
    Employees,
    Sessions,
} = require('../../models')
const {
    validationResult
} = require("express-validator");
const fs = require("fs");

class SessionsController {
    // Get All Data
    static async list(req, res, next) {
        try {
            const sessions = await Sessions.findAll({
                include: [{
                    model: Employees,
                    as: 'Judge',
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }]
            })

            if (sessions[0]) {
                res.status(200).json(sessions)
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

    // Get detail data session
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

            const sessions = await Sessions.findOne({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: Employees,
                    as: 'Judge',
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }]
            })

            if (!sessions) {
                throw {
                    status: 404,
                    message: 'Data Not Found'
                }
            } else {
                res.status(200).json(sessions)
            }
        } catch (err) {
            next(err)
        }
    }

    // create session
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

            const applications = await Applications.findOne({
                where: {
                    id: req.body.application_id
                }
            })

            if (!applications) {
                throw {
                    status: 404,
                    message: 'Data Not Found!'
                }
            } else {
                // Need validation sessions not double
                const sessions = await Sessions.findOne({
                    where: {
                        application_id: req.body.application_id
                    }
                });

                if (sessions) {
                    throw {
                        status: 400,
                        message: 'Data Already is exists!'
                    }
                } else {
                    await Sessions.create({
                        application_id: applications.id,
                        judge_id: req.body.judge_id,
                        register_date: req.body.register_date,
                        case_number: req.body.case_number,
                        case_schedule: req.body.case_schedule,
                        session_location: req.body.session_location,
                        // file_decision: req.body.file_decision,
                    });

                    res.status(201).json({
                        message: 'Succesfully Created!'
                    })
                }
            }
        } catch (err) {
            next(err)
        }
    }

    // Update data session
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

            const sessions = await Sessions.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!sessions) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                if (req.file) {
                    req.body.file_decision = `${process.env.BASE_URL}decision_file/${req.file.filename}`
                }

                await Sessions.update({
                    application_id: req.body.application_id,
                    judge_id: req.body.judge_id,
                    register_date: req.body.register_date,
                    case_number: req.body.case_number,
                    case_schedule: req.body.case_schedule,
                    session_location: req.body.session_location,
                    file_decision: req.body.file_decision,
                }, {
                    where: {
                        id: req.params.id
                    }
                });

                // Delete File
                if (sessions.file_decision) {
                    const DIR = 'public/decision_file/' + (sessions.file_decision.split(`${process.env.BASE_URL}decision_file/`)[1]);
                    if (fs.existsSync(DIR)) {
                        fs.unlinkSync(DIR)
                    }
                }

                res.status(200).json({
                    message: 'Succesfully Updated!'
                })
            }
        } catch (err) {
            next(err)
        }
    }

    // Delete data session
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

            const sessions = await Sessions.findOne({
                where: {
                    id: req.params.id
                }
            })

            if (!sessions) {
                throw {
                    status: 404,
                    message: 'Data not found!'
                }
            } else {
                await Sessions.destroy({
                    where: {
                        id: req.params.id
                    }
                })

                // Delete File
                const DIR = 'public/decision_file/' + (sessions.file_decision.split(`${process.env.BASE_URL}decision_file/`)[1]);
                if (fs.existsSync(DIR)) {
                    fs.unlinkSync(DIR)
                }

                res.status(201).json({
                    message: 'Succesfully Deleted!'
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = SessionsController;