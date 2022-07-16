const express = require('express')
const router = express.Router()
const jwtServices = require("../services/jwt.service")
const { checkRole } = require('../middleware/checkRole.middleware')
const Controller = require('../controllers/DiscountCode.controller')
const Validate = require("../validators/index")
const { defaultRoles } = require('../config/defineModel')
const SchemaValidateDiscountCode = require("../validators/discountCode.validator")

router.post('/addDiscountCode', jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateDiscountCode.addDiscountCode), Controller.addDiscountCodeAsync)
module.exports = router