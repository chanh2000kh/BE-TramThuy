const express = require('express')
const router = express.Router()
const jwtServices = require("../services/jwt.service")
const { checkRole } = require('../middleware/checkRole.middleware')
const controller = require('../controllers/ProductType.controller')
const Validate = require("../validators/index")
const { defaultRoles } = require('../config/defineModel')
const SchemaValidateProductType = require("../validators/productType.validator")


//@route GET /api/producttype/getProductTypeAll
//@desc get all product type
//@access public(
router.get('/getProductTypeAll', controller.getAllProductTypeAsync)
router.post('/createProductType', jwtServices.verify, checkRole([defaultRoles.Admin]),Validate.body(SchemaValidateProductType.createProductType), controller.createProductTypeAsync)
router.put('/updateProductType', jwtServices.verify, checkRole([defaultRoles.Admin]),Validate.body(SchemaValidateProductType.updateProductType), controller.updateProductTypeAsync)
module.exports = router