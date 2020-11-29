const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../docs/swagger.json');
const recordsRoute = require('./records.route');
const { notFoundErrorResponse } = require('../utils/response.utils');

module.exports = (app) => {
	app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
	app.use('/api/records', recordsRoute);
	// app.use((req, res) => res.redirect('/api/swagger'));
	app.use((req, res) => notFoundErrorResponse(res, 'The requested url was not found on this server!'));
};



