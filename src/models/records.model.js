const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
	key: {
		type: String,
		required: true
	},
	value: {
		type: String,
		required: true
	},
	counts: {
		type: [Number],
		required: false,
	}
});


module.exports = mongoose.model('records', recordSchema);