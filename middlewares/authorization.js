const {
  Op
} = require('sequelize')
const {
  Users,
  Employees,
  Partners,
  Roles,
} = require('../models')
const jwt = require('jsonwebtoken')

const EmployeeAuthorization = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw {
        status: 401,
        message: 'Unauthorized request'
      }
    } else {
      const employee = jwt.verify(req.headers.authorization, process.env.MY_JWT_TOKEN)
      if (employee) {
        // mencari employeenya di database
        const loggedInEmployee = await Employees.findOne({
          where: {
            username: employee.username
          }
        })
        if (loggedInEmployee) {
          req.employee = employee
          next()
        } else {
          throw {
            status: 401,
            message: 'Unauthorized request'
          }
        }
      } else {
        throw {
          status: 401,
          message: 'Unauthorized request'
        }
      }
    }
  } catch (err) {
    next(err)
  }
}

const AdminAuthorization = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw {
        status: 401,
        message: 'Unauthorized request'
      }
    } else {
      const employee = jwt.verify(req.headers.authorization, process.env.MY_JWT_TOKEN)
      if (employee) {
        // mencari employee type admin di database
        const loggedInEmployee = await Employees.findOne({
          where: {
            [Op.and]: [{
              username: employee.username
            }, {
              '$Role.role_type$': 'Admin'
            }]
          },
          include: [{
            model: Roles
          }]
        })
        if (loggedInEmployee) {
          req.employee = employee
          next()
        } else {
          throw {
            status: 401,
            message: 'Unauthorized request | Admin Only'
          }
        }
      } else {
        throw {
          status: 401,
          message: 'Unauthorized request'
        }
      }
    }
  } catch (err) {
    next(err)
  }
}

const UserAuthorization = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw {
        status: 401,
        message: 'Unauthorized request'
      }
    } else {
      const users = jwt.verify(req.headers.authorization, process.env.MY_JWT_TOKEN)
      // console.log(users)
      if (users) {
        // mencari usersnya di database
        const loggedInUsers = await Users.findOne({
          where: {
            username: users.username
          }
        })
        if (loggedInUsers) {
          req.user = users
          next()
        } else {
          throw {
            status: 401,
            message: 'Unauthorized request'
          }
        }
      } else {
        throw {
          status: 401,
          message: 'Unauthorized request'
        }
      }
    }
  } catch (err) {
    next(err)
  }
}

const PartnerAuthorization = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw {
        status: 401,
        message: 'Unauthorized request'
      }
    } else {
      const partners = jwt.verify(req.headers.authorization, process.env.MY_JWT_TOKEN)
      // console.log(partners)
      if (partners) {
        // mencari partnersnya di database
        const loggedInPartners = await Partners.findOne({
          where: {
            username: partners.username
          }
        })
        if (loggedInPartners) {
          req.partner = partners
          next()
        } else {
          throw {
            status: 401,
            message: 'Unauthorized request'
          }
        }
      } else {
        throw {
          status: 401,
          message: 'Unauthorized request'
        }
      }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  EmployeeAuthorization,
  AdminAuthorization,
  UserAuthorization,
  PartnerAuthorization,
}