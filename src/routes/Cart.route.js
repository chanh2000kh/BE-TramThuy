const express = require('express')
const router = express.Router()
const jwtServices = require("../services/jwt.service")
const { checkRole } = require('../middleware/checkRole.middleware')
const Controller = require('../controllers/Cart.controller')
const Validate = require("../validators/index")
const { defaultRoles } = require('../config/defineModel')
const SchemaValidateCart = require("../validators/cart.validator")

router.get('/getCart', jwtServices.verify, Validate.body(SchemaValidateCart.getCart), Controller.getCartAsync)
router.post('/addCart', jwtServices.verify, Validate.body(SchemaValidateCart.addCart), Controller.addCartAsync)
router.post('/updateCart', jwtServices.verify, Validate.body(SchemaValidateCart.updateCart), Controller.updateCartAsync)
router.delete('/deleteCart', jwtServices.verify, Validate.body(SchemaValidateCart.deleteCart), Controller.deleteCartAsync)
module.exports = router