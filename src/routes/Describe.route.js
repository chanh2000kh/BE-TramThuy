const express = require('express')
const router = express.Router()
const jwtServices = require("../services/jwt.service")
const { checkRole } = require('../middleware/checkRole.middleware')
const Controller = require('../controllers/Describe.controller')
const Validate = require("../validators/index")
const { defaultRoles } = require('../config/defineModel')
const SchemaValidateDescribe= require("../validators/describe.validator")

router.post('/addDescribe', jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateDescribe.addDescribe), Controller.addDescribeAsync)
router.put('/editDescribe', jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateDescribe.editDescribe), Controller.editDescribeAsync)
router.get('/getDescribe', Controller.getDescribeAsync)
router.get('/getDescribeById', Controller.getDescribeByIdAsync)
module.exports = router