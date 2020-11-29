const RecordModel = require('../models/records.model');

const getRecordsWithParams = async ({
	startDate, endDate, minCount, maxCount,
}) => {
	const pipeline = [
		{
			$project: {
				_id: 0,
				key: 1,
				createdAt: 1,
				totalCount: { $sum: '$counts' },
			}
		},
		{
			$match: {
				createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
				totalCount: { $gte: minCount, $lte: maxCount }
			},
		}
	];

	return await RecordModel.aggregate(pipeline);

};

module.exports = { getRecordsWithParams };
