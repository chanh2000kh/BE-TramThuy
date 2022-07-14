const express = require('express')
const router = express.Router()
const jwtServices = require("../services/jwt.service")
const { checkRole } = require('../middleware/checkRole.middleware')
const Controller = require('../controllers/admin.controller')
const Validate = require("../validators/index")
const { defaultRoles } = require('../config/defineModel')
const SchemaValidateAdmin = require("../validators/admin.validator")

router.post('/createUserAdmin', jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateAdmin.createUser), Controller.createUserAsync)
router.post('/loginAdmin', Validate.body(SchemaValidateAdmin.loginUser), Controller.loginAsync)

module.exports = router