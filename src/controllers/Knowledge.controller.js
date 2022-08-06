const controller = require('./controller');
const knowledgeService = require('../services/Knowledge.service')
const { UploadImage, UploadPdf } = require("../services/uploadFirebase.service");

exports.createKnowledgeAsync = async (req, res, next) => {
	try {
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
		const resServices = await knowledgeService.createKnowledgeAsync(req.value.body);
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

exports.updateKnowledgeAsync = async (req, res, next) => {
	try {
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
		const resServices = await knowledgeService.updateKnowledgeAsync(req.body);
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

exports.getKnowledgeAllAsync = async (req, res, next) => {
	try {
		let query = {		
			limit: req.query.limit || '15',
			skip: req.query.skip || '1',
		};
		const resServices = await knowledgeService.getKnowledgeAllAsync(query);
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

exports.getOneKnowledAsync = async (req, res, next) => {
	try {
		let query = {		
			id: req.query.id
		};
		const resServices = await knowledgeService.getOneKnowledAsync(query);
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