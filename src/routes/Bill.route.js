const express = require('express')
const router = express.Router()
const jwtServices = require("../services/jwt.service")
const { checkRole } = require('../middleware/checkRole.middleware')
const Controller = require('../controllers/Bill.controller')
const Validate = require("../validators/index")
const { defaultRoles } = require('../config/defineModel')
const SchemaValidateBill = require("../validators/bill.validator")

router.post('/createBill', jwtServices.verify, Validate.body(SchemaValidateBill.createBill), Controller.createBillAsync)
router.get('/getBill', jwtServices.verify, Validate.body(SchemaValidateBill.getBill), Controller.getBillAsync)
module.exports = router