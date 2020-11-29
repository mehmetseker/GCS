const { getRecordsWithParams } = require('../services/records.service');
const { successResponse, errorResponse } = require('../utils/response.utils');

const getRecords = async (req, res) => {
	try {
		const records = await getRecordsWithParams(req.body);
		return successResponse(res, records);
	} catch (err) {
		return errorResponse(req, res, err);
	}
};

module.exports = { getRecords };
