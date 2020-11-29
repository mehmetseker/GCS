const mongoose = require('mongoose');

module.exports = () => {
	mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
		() => {
			console.log('Mongodb connection is successful!');
		});
};