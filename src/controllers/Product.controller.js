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

exports.getAllProductAsync = async (req, res, next) => {
	try {
		let query = {		
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
		};
		const resServices = await productServices.getAllProductAsync(query);
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
};

exports.getProductTagTotalAsync = async (req, res, next) => {
	try {
		let query = {		
			id: req.query.id
		};
		const resServices = await productServices.getProductTagTotalAsync(query);
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
};

exports.getProductBestSellAsync = async (req, res, next) => {
	try {
		let query = {		
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
			increase: req.query.increase || 1,
		};
		const resServices = await productServices.getProductBestSellAsync(query);
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
};

exports.getAllProductByTypeIdAsync = async (req, res, next) => {
	try {
		let query = {		
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
			productTypeId: req.query.id,
			tag: req.query.tag || 0,
			min: req.query.min || 0,
			max: req.query.max || 10000000,
		};
		const resServices = await productServices.getAllProductByTypeIdAsync(query);
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
};

exports.searchProductAsync = async (req, res, next) => {
	try {
		let query = {		
			limit: req.query.limit || '5',
			skip: req.query.skip || '1',
			name: req.query.name
		};
		const resServices = await productServices.searchProductAsync(query);
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
};

exports.getAllProductByTypeId1Async = async (req, res, next) => {
	try {
		console.log(req.value.body)
		let query = {		
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
			productTypeId: req.query.id,
			tag: req.value.body.tag,
			fromBigToSmall: req.value.body.fromBigToSmall || -1,
			name: req.value.body.name || "createdAt",
			min: req.query.min || 0,
			max: req.query.max || 10000000,
		};
		const resServices = await productServices.getAllProductByTypeId1Async(query);
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
};

exports.getOneProductAsync = async (req, res, next) => {
	try {
		let query = {		
			id: req.query.id
		};
		const resServices = await productServices.getOneProductAsync(query);
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
};