const express = require('express')
const router = express.Router()
const authRoutes = require('./auth.route')
const partnerRoutes = require('./partners.route')
const sharing_applicationRoutes = require('./sharing_applications.route')

router.use('/auth', authRoutes)
router.use('/partners', partnerRoutes)
router.use('/applications', sharing_applicationRoutes) // Sharing Applications

module.exports = router

// npx sequelize-cli model:generate --name Partners --attributes username:string,password:string,institution:string,status:string 
// npx sequelize-cli model:generate --name Sharing_Applications --attributes application_id:integer,partner_id:integer 