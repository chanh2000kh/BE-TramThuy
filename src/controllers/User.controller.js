const controller = require('./controller');
const userServices = require('../services/User.service');

exports.createUserAsync = async (req, res, next) => {
	try {
		const resServices = await userServices.createUserAsync(req.value.body);
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
exports.registerByEmailAsync = async (req, res, next) => {
	try {
		const resServices = await userServices.registerByEmailAsync(req.value.body);
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
exports.loginUserAsync = async (req, res, next) => {
	try {
		const resServices = await userServices.loginUserAsync(req.value.body);
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
exports.loginwithGoogleAsync = async (req, res, next) => {
	try {
		const resServices = await userServices.loginwithGoogleAsync(req.value.body);
		controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	}
	catch (err) {
		console.log(err);
		return controller.sendError(res);
	}
}
exports.findUserByTokenAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		console.log(id);
		const resServices = await userServices.findUserByIdAsync(id);
		return controller.sendSuccess(
			res,
			resServices.data,
			200,
			resServices.message
		);
	} catch (error) {
		// bug
		console.log(error);
		return controller.sendError(res);
	}
};

exports.editProfileAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		console.log(req.value.body)
		const resServices = await userServices.editProfileAsync(id, req.value.body);
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
	} catch (error) {
		return controller.sendError(res);
	}
};
exports.forgotPasswordAsync = async (req, res, next) => {
	try {
		const { email } = req.body;
		const resServices = await userServices.fotgotPassword({ email: email });
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
			resServices.success,
			200,
			resServices.message
		);
	} catch (error) {
		console.log(error);
		return controller.sendError(res);
	}
};
exports.resetPasswordAsync = async (req, res, next) => {
	try {
		const resServices = await userServices.resetPassword(req.value.body);
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
	} catch (error) {
		console.log(error);
		return controller.sendError(res);
	}
};

exports.verifyUserAsync = async (req, res, next) => {
	try {
		const resServices = await userServices.verifyUser(req.value.body);
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
	} catch (error) {
		console.log(error);
		return controller.sendError(res);
	}
};

exports.changePasswordAsync = async (req, res, next) => {
	try {
		const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		const resServices = await userServices.changePasswordAsync(id, req.body);
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
			resServices.success,
			200,
			resServices.message
		);
	} catch (error) {
		return controller.sendError(res);
	}
};
