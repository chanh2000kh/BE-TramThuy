const controller = require('./controller');
const discountCodeServices = require('../services/DiscountCode.service');

exports.addDiscountCodeAsync = async (req, res, next) => {
    try {
        const resServices = await discountCodeServices.addDiscountCodeAsync(req.value.body);

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