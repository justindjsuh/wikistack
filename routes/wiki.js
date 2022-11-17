const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");
const layout = require("../views/layout");
const { Pages } = require("../models/index");
// const { addPage } = require("../views");
const { Sequelize } = require("sequelize");

router.get("/", (req, res, next) => {
  res.send(layout());
});
router.get("/add", (req, res, next) => {
  res.send(addPage());
});

router.post("/", async (req, res, next) => {
  // STUDENT ASSIGNMENT: add definitions for `title` and `content`
  // declare title & content here. BEFORE the try statement.
  try {
    const page = await Pages.create({
      title: req.body.title,
      content: req.body.content,
      // we need to address name & email & slug here??
    });
    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
