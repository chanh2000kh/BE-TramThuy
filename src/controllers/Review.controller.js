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