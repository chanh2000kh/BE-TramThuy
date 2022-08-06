const express = require('express')
const router = express.Router()
const jwtServices = require("../services/jwt.service")
const { checkRole } = require('../middleware/checkRole.middleware')
const controller = require('../controllers/Knowledge.controller')
const Validate = require("../validators/index")
const { defaultRoles } = require('../config/defineModel')
const SchemaValidateKnowledge = require("../validators/knowledge.validator")

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

router.post('/createKnowledge',cpUpload, jwtServices.verify, checkRole([defaultRoles.Admin]), Validate.body(SchemaValidateKnowledge.createKnowledge), controller.createKnowledgeAsync)
router.put('/updateKnowledge',cpUpload, jwtServices.verify, checkRole([defaultRoles.Admin]), controller.updateKnowledgeAsync)
router.get('/getKnowledgeAll', controller.getKnowledgeAllAsync)
router.get('/getOneKnowled', controller.getOneKnowledAsync)
module.exports = router