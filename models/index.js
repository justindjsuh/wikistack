const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

const Pages = db.define("pages", {
  // title, slug, content, status:
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "unnamed article",
    validate: {
      // title can be just about anything, BUT length must > 0.
      notEmpty: true,
      // or use len: [1, 88] to say title's length is restricted to 1, 88 inclusive.
    },
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "https://en.wikipedia.org",
    validate: {
      isURL: true,
    },
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "[Content should go here, god willing]",
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
    defaultValue: "closed",
    validate: {
      isIn: [["open", "closed"]],
    },
  },
});
///
///
const Users = db.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "mystery user",
    validate: {
      // we will reject _ @ $ and any other special characters, for the purposes of this task.
      isAlphanumeric: true,
      notEmpty: true, // passing isAlpha probably means the string is indeed not empty; this is here as a "JUST IN CASE."
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "kevinJames@cbs.com",
    validate: {
      iseMail: true,
    },
  },
});

module.exports = {
  db,
  Pages,
  Users,
};
