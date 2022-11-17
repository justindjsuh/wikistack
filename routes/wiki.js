const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const layout = require('../views/layout');

router.get('/', (req, res, next) => {
  res.send(layout());
});
router.get('/add', (req, res, next) => {
  res.send(addPage());
});
router.post('/', (req, res, next) => {
  res.json(req.body);
  res.send(`<h1>post form page</h1>`);
});

module.exports = router;
