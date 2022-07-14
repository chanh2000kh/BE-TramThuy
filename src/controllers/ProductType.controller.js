const controller = require('./controller');
const productTypeService = require('../services/ProductType.service')

exports.getOneProductTypeAsync = async (req, res, next) => {
	try {
		const resServices = await productTypeService.getOneProductTypeAsync(req.query.id);
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

exports.getAllProductTypeAsync = async (req, res, next) => {
	try {
		let query = {		
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
		};
		const resServices = await productTypeService.getAllProductTypeAsync(query);
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
exports.createProductTypeAsync = async (req, res, next) => {
	try{
        const resServices = await productTypeService.createProductTypeAsync(req.value.body);
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

	}catch(error){
		// bug
		console.log(error);
		return controller.sendError(res);
	}
}

exports.updateProductTypeAsync = async (req, res, next) => {
	try{
        const resServices = await productTypeService.updateProductTypeAsync(req.value.body);
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

	}catch(error){
		// bug
		console.log(error);
		return controller.sendError(res);
	}
}