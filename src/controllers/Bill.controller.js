const controller = require('./controller');
const billServices = require('../services/Bill.service');

exports.createBillAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		// console.log(req.value.body)
        const resServices = await billServices.createBillAsync(id, req.value.body);

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

exports.createBillHaventTokenAsync = async (req, res, next) => {
    try {
        const resServices = await billServices.createBillHaventTokenAsync( req.value.body);

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

exports.changeStatusAsync = async (req, res, next) => {
	try {
		const resServices = await billServices.changeStatusAsync(req.body);
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


exports.getBillByStatusAsync = async (req, res, next) => {
	try {
		let query = {		
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
            status : req.query.status || 0
		};
		const resServices = await billServices.getBillByStatusAsync(query);
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

exports.getBillAsync = async (req, res, next) => {
    try {
        const { decodeToken } = req.value.body;
		const id = decodeToken.data.id;
		// console.log(req.value.body)
        const resServices = await billServices.getBillAsync(id, req.value.body);

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
exports.getBillByIdAsync = async (req, res, next) => {
    try {
        let query = {		
			id: req.query.id
		};
        const resServices = await billServices.getBillByIdAsync(query);

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
