const joi = require('@hapi/joi');
const { validationErrorResponse } = require('../utils/response.utils');

const recordRequestSchema = joi.object({
	minCount: joi.number().integer().required(),
	maxCount: joi.number().integer().greater(joi.ref('minCount')).required(),
	startDate: joi.date().iso().required(),
	endDate: joi.date().iso().greater(joi.ref('startDate')).required()
});

const validateRecord = async (req, res, next) => {
	try {
		await recordRequestSchema.validateAsync(req.body);
		return next();
	} catch (err) {
		return validationErrorResponse(req, res, err);
	}
};

module.exports = {
	validateRecord,
};
