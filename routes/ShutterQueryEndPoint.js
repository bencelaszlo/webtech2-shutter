var express = require('express');
var router = express.Router();

var Shutter = require('./Shutter');

var mongoose = require('mongoose');

router.get('/shutters/list', function(req, res)  {
	if (typeof req.query['_id'] != 'undefined') {
		Shutter.find({'_id': req.query['_id']}).exec(function(err, doc) {
			if (doc.length > 0) {
				var result = "<div>";
				for (var i = 0; i < doc.length; i++) {
					result += "<div>";
					result += "<b>ID: " + doc[i].id + "</b><br/>";
					result += "<b>Customer: " + doc[i].customer + "</b></br>";
					result += "<b>Price: " + doc[i].price + "</b></br>";
					if (doc[i].isPaid) {
						if (doc[i].isAssembled) {
							if (doc[i].isInstalled) {
								result += "Installed.<br/>";
							} else {
								result += "Waiting for installation.<br/>";
							}
						} else {
							result += "Waiting for manufacturing.<br/>"
						}
					} else {
						result += "Waiting for payment.<br/>";
					}
					result += "</div>";
				}
				result += "</div>";
				res.status(200).send("<h1>" + result + "</h1>"
				);
			} else {
				res.status(200).send("<h1>Not found order with this ID: " + req.query['_id'] + "</h1>");
			}
		});
		console.log('ID is %s', req.query['_id']);
		return;
	}
	Shutter.find({}).exec(function(err, doc) {
		var result = "<div>";
		for (var i = 0; i < doc.length; i++) {
			result += "<div>";
			result += "<b>ID: " + doc[i].id + "</b><br/>";
			result += "<b>Customer: " + doc[i].customer + "</b></br>";
			result += "<b>Price: " + doc[i].price + "</b></br>";
			if (doc[i].isPaid) {
				if (doc[i].isAssembled) {
					if (doc[i].isInstalled) {
						result += "Installed.<br/>";
					} else {
						result += "Waiting for installation.<br/>";
					}
				} else {
					result += "Waiting for manufacturing.<br/>"
				}
			} else {
				result += "Waiting for payment.<br/>";
			}
			result += "</div>";
		}
		result += "</div>";
		res.status(200).send("<h1>" + result + "</h1>");
	});
});

router.post('/shutters/add', function(req, res) {
	console.log(req.body['tiltBar'] + "EEEE");
	Shutter.create({
		_id: new mongoose.Types.ObjectId(),
		parts: {
			tiltBar: req.body['tiltBar'],
			tiltBarConnector: req.body['tiltBarConnector'],
			catches: req.body['catches'],
			louvers: req.body['louvers'],
			louverPins: req.body['louverPins'],
			glue: req.body['glue']
		},
		price: req.body['price'],
		isPaid: false,
		isAssembled: false,
		isInstalled: false,
		customer: req.body['customer']
		}, function (err, doc) {
			if (err) {
				return console.log(err);
				console.log(err);
				console.log(doc);
				res.status(415).send(err + '' + doc);
			}
	});
	res.status(200).send("Order has been saved with the following ID: " + res.body['_id']);
});

router.post('/shutters/pay', function(req, res) {

	Shutter.find({'_id': req.body['_id']}).exec(function(err, shutters) {
		if (err) {
			console.log(err);
		}

		for (var i = 0; i < cars.length; i++) {
			shutters[i].isPaid = true;
			shutters[i].save();
		}

		res.status(200).send(shutters);
	})
})

router.post('/shutters/assemble', function(req, res) {

	Shutter.find({'_id': req.body['_id']}).exec(function(err, shutters) {
		if (err) {
			console.log(err);
		}

		for (var i = 0; i < shutters.length; i++) {
			shutters[i].isAssembled = true;
		}

		res.status(200).send(shutters);
	});
});

router.get('/shutters/listParts', function(req, res) {
	if (typeof req.query['_id'] != 'undefined') {
		Shutter.find({'_id': req.query['_id']}).exec(function (err, doc) {
			res.status(200).send(doc['parts']);
		});
		return;
	}
	Shutter.find({}).exec(function(err, doc) {
		res.status(200).send(doc['parts']);
	});
});

router.get('/shutters/viewCustomer', function(req, res) {
	Shutter.find({'customer': req.body['customer']}).exec(function(err, shutters) {
		if (err) {
			console.log(err);
		}	

		res.status200.send(shutters);
	});	
});

router.get('/shutters/createInvoice', function(req, res) {
	Shutter.find({'_id': req.body['_id']}).exec(function(err, shutters) {
		if (err) {
			console.log(err);
		}

		res.status(200).send("Name: " + shutters[0].customer + " Price: " + shutters[0].price); //TO PDF?
	});	
});

router.get('/shutters/checkPayment', function(req, res) {
	Shutter.find({'_id': req.body['_id']}).exec(function(err, shutters) {
		if (err) {
			console.log(err);
		}		

		res.status(200).send(shutters[0].isPaid);
	});
});

router.post('/shutters/organizeInstallation', function(req, res) {
	Shutter.find({'_id': req.body['_id']}).exec(function(err, shutters) {
	if (err) {
		console.log(err);
	}

	for (var i = 0; i < shutters.length; i++) {
		shutters[i].isInstalled = true;
	}

	res.status(200).send(shutters);
	});	
});

router.get('/shutters/remove', function(req, res) {
	if (typeof req.query['_id'] == 'undefined') {
		res.status(415).send('ID is required!');
	}	

	Shutter.remove({'_id': req.query['_id']}, function(err) {
		console.log(err);
	});
	res.status(200).send(req.query['_id'] + ' has been removed from the database.');
});

module.exports = router;