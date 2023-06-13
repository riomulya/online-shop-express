const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
  console.log(res.locals);
  res.redirect('/products');
});

module.exports = router;
