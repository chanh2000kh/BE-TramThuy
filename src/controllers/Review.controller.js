const controller = require('./controller');
const reviewServices = require('../services/Review.service');

exports.addReviewAsync = async (req, res, next) => {
	try {
		const resServices = await reviewServices.addReviewAsync(req.value.body);
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

exports.verifyReviewAsync = async (req, res, next) => {
	try {
		const resServices = await reviewServices.verifyReviewAsync(req.value.body);
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

exports.getReviewByIdProductAsync = async (req, res, next) => {
	try {
		let query = {		
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
			productId: req.query.id,
		};
		const resServices = await reviewServices.getReviewByIdProductAsync(query);
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

exports.getAllReviewAsync = async (req, res, next) => {
	try {
		let query = {		
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
		};
		const resServices = await reviewServices.getAllReviewAsync(query);
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

exports.getAllReviewNewAsync = async (req, res, next) => {
	try {
		let query = {		
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
		};
		const resServices = await reviewServices.getAllReviewNewAsync(query);
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