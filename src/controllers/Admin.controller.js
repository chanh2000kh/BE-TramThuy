const controller = require('./controller');
const adminServices = require('../services/Admin.service');

exports.createUserAsync = async (req, res, next) => {
    try {
        const resServices = await adminServices.createUserAsync(req.value.body);

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

exports.loginAsync = async (req, res, next) => {
	try {
		const resServices = await adminServices.loginAsync(req.value.body);
		if (!resServices.success) {
			return controller.sendSuccess(res, {}, 300, resServices.message);
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