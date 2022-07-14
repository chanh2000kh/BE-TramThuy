const controller = require('./controller');
const productType = require('../models/ProductType.model')
const productServices = require('../services/Product.service');
const { UploadImage, UploadPdf } = require("../services/uploadFirebase.service");

exports.createProductAsync = async (req, res, next) => {
	try {
		const producttype = await productType.findOne({
			_id: req.value.body.productTypeId
		});
		if (producttype == null) {
			return controller.sendSuccess(
				res,
				null,
				404,
				'Product type does not exist'
			);
		}
		const Image = req.files["img"];
		if(Image != null)
		{
			var urlImageMain = [];
			for (let i = 0; i < Image.length; i++) {
				var addImage = req.files["img"][i];
				console.log(addImage.filename);
				const urlImage = await UploadImage(addImage.filename, "Products/" + req.value.body.name + "/");
				urlImageMain.push(urlImage);
			}
			req.value.body.img = urlImageMain;
		}
		
		const resServices = await productServices.createProductAsync(req.value.body);
		if (resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.data,
				200,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			300,
			resServices.message
		);

	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
}

exports.updateProductAsync = async (req, res, next) => {
	try {
		const producttype = await productType.findOne({
			_id: req.body.productTypeId
		});
		if (producttype == null) {
			return controller.sendSuccess(
				res,
				null,
				404,
				'Product type does not exist'
			);
		}
		const Image = req.files["img"];
		if(Image != null)
		{
			var urlImageMain = [];
			for (let i = 0; i < Image.length; i++) {
				var addImage = req.files["img"][i];
				console.log(addImage.filename);
				const urlImage = await UploadImage(addImage.filename, "Products/" + req.value.body.name + "/");
				urlImageMain.push(urlImage);
			}
			req.value.body.img = urlImageMain;
		}
		
		const resServices = await productServices.updateProductAsync(req.body);
		if (resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.data,
				200,
				resServices.message
			);
		}
		return controller.sendSuccess(
			res,
			resServices.data,
			300,
			resServices.message
		);

	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
}