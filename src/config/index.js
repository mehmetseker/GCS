const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	port: process.env.PORT,
	databaseUri: process.env.DATABASE_URI
};