const express = require('express')
const router = express.Router()
const jwtServices = require("../services/jwt.service")
const { checkRole } = require('../middleware/checkRole.middleware')
const Controller = require('../controllers/Product.controller')
const Validate = require("../validators/index")
const { defaultRoles } = require('../config/defineModel')
const SchemaValidateProduct = require("../validators/product.validator")

const path = require("path");
var multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + Math.floor(Math.random() * 100) + path.extname(file.originalname));
    },
  });
const upload = multer({ storage: storage });
var cpUpload = upload.fields([{ name: 'img', maxCount: 100 }, { name: 'img', maxCount: 100 }]);


router.post('/createProduct',cpUpload, jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateProduct.createProduct), Controller.createProductAsync)
router.put('/updateProduct',cpUpload, jwtServices.verify, checkRole([defaultRoles.Admin]), Controller.updateProductAsync)
router.get('/getProductAll', Controller.getAllProductAsync)
router.get('/getProductBestSell', Controller.getProductBestSellAsync)
router.get('/getProductTagTotal', Controller.getProductTagTotalAsync)
router.get('/getProductByTypeId', Controller.getAllProductByTypeIdAsync)
router.get('/searchProduct', Controller.searchProductAsync)
router.post('/getProductByTypeId1', Validate.body(SchemaValidateProduct.productByTypeId1), Controller.getAllProductByTypeId1Async)
router.get('/getOneProduct', Controller.getOneProductAsync)
module.exports = router