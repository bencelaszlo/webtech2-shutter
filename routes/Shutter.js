var mongoose = require('mongoose');

var database = mongoose.createConnection('mongodb://localhost:27017/shutters', {autoIndex: true, useNewUrlParser: true});
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function() {
	console.log('MongoDB is open.');
});

var Schema = mongoose.Schema;
var ShutterSchema = new Schema({
	_id: Schema.ObjectId,
	parts: {
		tiltBar: Number,
		tiltBarConnector: Number,
		catches: Number,
		louvers: Number,
		louverPins: Number,
		glue: Number
	},
	price: Number,
	isPaid: Boolean,
	isAssembled: Boolean,
	isInstalled: Boolean,
	customer: String
});

module.exports = database.model('shutters', ShutterSchema);