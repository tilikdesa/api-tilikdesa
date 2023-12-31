const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.route')
const applicationRoutes = require('./applications.route')
const ecourtRoutes = require('./ecourts.route')
const employeeRoutes = require('./employees.route')
const queueRoutes = require('./queues.route')
const sessionRoutes = require('./sessions.route')
const fileRoutes = require('./files.route')
const userRoutes = require('./users.route')

router.use('/auth', authRoutes)
router.use('/applications', applicationRoutes)
router.use('/ecourts', ecourtRoutes)
router.use('/employees', employeeRoutes)
router.use('/queues', queueRoutes)
router.use('/sessions', sessionRoutes)
router.use('/files', fileRoutes)
router.use('/users', userRoutes)

module.exports = router