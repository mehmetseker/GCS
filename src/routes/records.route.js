const { Router } = require('express');
const { getRecords } = require('../api/records.api');
const { validateRecord } = require('../middlewares/validations');

const recordsRoute = new Router();
recordsRoute.post('/', validateRecord, getRecords);

module.exports =  recordsRoute ;
