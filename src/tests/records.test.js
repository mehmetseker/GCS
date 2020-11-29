const supertest = require('supertest');
const { port } = require('../config/index');
const statusCode = require('../utils/status-code.utils');

const request = supertest(`http://localhost:${port}/api`);

describe('Api records test :', () => {
	const records = '/records';
	it('should return  status = \'200\' and success =\'true\'  when request is valid', async (done) => {
		const maxCount = 3000;
		const minCount = 2000;

		const { status, body } = await request.post(records)
			.send({
				startDate: '2015-01-01',
				endDate: '2016-01-01',
				maxCount: maxCount,
				minCount: minCount
			});

		expect(status).toEqual(statusCode.SuccessOK);
		expect(body.success).toEqual(true);

		done();
	});

	it('should return totalCount greater or equal to minCount and maxCount when request is valid', async (done) => {
		const maxCount = 3000;
		const minCount = 2000;

		const { body } = await request.post(records)
			.send({
				startDate: '2015-01-01',
				endDate: '2016-01-01',
				maxCount: maxCount,
				minCount: minCount
			});

		body.data.forEach((record) => {
			expect(record.totalCount).toBeGreaterThanOrEqual(minCount);
			expect(record.totalCount).toBeLessThanOrEqual(maxCount);
		});
		done();
	});

	it('should return bad request and \"startDate\" must be in ISO 8601 date format when start date is not valid', async (done) => {
		const maxCount = 3000;
		const minCount = 2000;

		const { status, body } = await request.post(records)
			.send({
				startDate: 'BadRequest',
				endDate: '2016-01-01',
				maxCount: maxCount,
				minCount: minCount
			});

		expect(status).toEqual(statusCode.ClientErrorBadRequest);
		expect(body.success).toEqual(false);
		expect(body.error).toEqual('Validation Error');
		done();
	});

	it('should return bad request and \"endDate\" must be in ISO 8601 date format when end date is not valid', async (done) => {
		const maxCount = 3000;
		const minCount = 2000;

		const { status, body } = await request.post(records)
			.send({
				startDate: '2016-01-01',
				endDate: 'BadRequest',
				maxCount: maxCount,
				minCount: minCount
			});

		expect(status).toEqual(statusCode.ClientErrorBadRequest);
		expect(body.success).toEqual(false);
		expect(body.error).toEqual('Validation Error');
		done();
	});

	it('should return 404 not found error when end point is not correct', async (done) => {
		const { status, body } = await request.post('wrong-end-point').send();

		expect(status).toEqual(statusCode.ClientErrorNotFound);
		expect(body.success).toEqual(false);
		expect(body.error).toEqual('Not Found Error');
		done();
	});
});