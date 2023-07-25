const express = require('express')
const router = express.Router()
const employeeRoutes = require('./employee/index.route')
const userRoutes = require('./user/index.route')
const partnerRoutes = require('./partner/index.route')

router.use('/employee', employeeRoutes)
router.use('/user', userRoutes)
router.use('/partner', partnerRoutes)

module.exports = router