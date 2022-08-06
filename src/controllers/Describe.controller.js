const controller = require('./controller');
const DescribeServices = require('../services/Describe.service');

exports.addDescribeAsync = async (req, res, next) => {
	try {
		const resServices = await DescribeServices.addDescribeAsync(req.value.body);
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}

		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);

	} catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
};

exports.editDescribeAsync = async (req, res, next) => {
	try {
		const resServices = await DescribeServices.editDescribeAsync(req.value.body);
		if (!resServices.success) {
			return controller.sendSuccess(
				res,
				resServices.success,
				300,
				resServices.message
			);
		}

		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);

	} catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
};

exports.getDescribeAsync = async (req, res, next) => {
	try {
		let query = {		
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
		};
		const resServices = await DescribeServices.getDescribeAsync(query);
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

exports.getDescribeByIdAsync = async (req, res, next) => {
	try {
		let query = {		
            id: req.query.id,
		};
		const resServices = await DescribeServices.getDescribeByIdAsync(query);
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