const express = require('express')
const router = express.Router()
const jwtServices = require("../services/jwt.service")
const { checkRole } = require('../middleware/checkRole.middleware')
const Controller = require('../controllers/Review.controller')
const Validate = require("../validators/index")
const { defaultRoles } = require('../config/defineModel')
const SchemaValidateReview = require("../validators/review.validator")

router.post('/addReview', Validate.body(SchemaValidateReview.addReview), Controller.addReviewAsync)
router.put('/verifyReview', jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateReview.verifyReview), Controller.verifyReviewAsync)

module.exports = router