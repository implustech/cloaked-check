const express = require('express');
const router = express.Router();
const version = require('../package.json').version


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cloaked Test', version: version });
});

router.use('/aggressive', function(req, res, next) {
  res.render('aggressive_test');
});

router.use('/compliant', function(req, res, next) {
  res.render('compliant_test');
});

module.exports = router;
