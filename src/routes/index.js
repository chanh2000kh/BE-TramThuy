const express = require('express')
const productTypeRoute = require('../routes/ProductType.route')
const adminRoute = require('../routes/Admin.route')
const userRoute = require('../routes/User.route')
const productRoute = require('../routes/Product.route')
const cartRoute = require('../routes/Cart.route')
const billRoute = require('../routes/Bill.route')
const discountCodeRoute = require('../routes/DiscountCode.route')
const reviewRoute = require('../routes/Review.route')
const describeRoute = require('../routes/Describe.route')
const knowledgeRoute = require('../routes/Knowledge.route')
const router = express.Router()

router.use('/api/producttype', productTypeRoute)
router.use('/api/admin', adminRoute)
router.use('/api/user', userRoute)
router.use('/api/product', productRoute)
router.use('/api/cart', cartRoute)
router.use('/api/bill', billRoute)
router.use('/api/discountCode', discountCodeRoute)
router.use('/api/review', reviewRoute)
router.use('/api/describe', describeRoute)
router.use('/api/knowledge', knowledgeRoute)

module.exports = router