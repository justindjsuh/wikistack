const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const layout = require('../views/layout');
const { Pages } = require('../models/index');

router.get('/', (req, res, next) => {
  res.send(layout());
});
router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.post('/', async (req, res, next) => {
  // STUDENT ASSIGNMENT: add definitions for `title` and `content`
  // declare title & content here. BEFORE the try statement.
  try {
    const page = await Pages.create({
      title: req.body.title,
      content: req.body.content,
      // added status b/c i think we'll need it anyway? (optional for now)
      status: req.body.status,
      // added slug with a default value of null, but we instantiate it here as a
      // value to be added in our table, because we need to change the value of
      // null, which we can do in our hook
      slug: null,
    });
    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
