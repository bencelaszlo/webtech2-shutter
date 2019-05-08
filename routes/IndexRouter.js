var express = require('express');
var router = express.Router();

router.get('/', function(get, res) {
   res.render('index', {title: 'Express'});
});

module.exports = router;