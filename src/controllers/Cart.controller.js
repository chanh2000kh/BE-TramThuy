const controller = require('./controller');
const cartServices = require('../services/Cart.service');

exports.getCartAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		// console.log(req.value.body)
        const resServices = await cartServices.getCartAsync(id, req.value.body);

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
exports.getCartHaventTokenAsync = async (req, res, next) => {
    try {
        const resServices = await cartServices.getCartHaventTokenAsync(req.value.body);

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


exports.addCartAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		// console.log(req.value.body)
        const resServices = await cartServices.addCartAsync(id, req.value.body);

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
exports.updateCartAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		// console.log(req.value.body)
        const resServices = await cartServices.updateCartAsync(id, req.value.body);

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

exports.deleteCartAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		// console.log(req.value.body)
        const resServices = await cartServices.deleteCartAsync(id, req.value.body);

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