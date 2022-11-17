const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

function makeSlug(title) {
  let wordsArray = title.split(" ");
  var regexPattern = /[^A-Za-z0-9]/g;
  // for each element of wordsArray, apply this regex.
  return wordsArray.map((word) => word.replace(regexPattern, "")).join("_"); // this step wiped out the non-alphanums
}

const Pages = db.define("pages", {
  // title, slug, content, status:
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      // title can be just about anything, BUT length must > 0.
      notEmpty: true,
      // or use len: [1, 88] to say title's length is restricted to 1, 88 inclusive.
    },
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isURL: true,
    },
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: Sequelize.ENUM("open", "closed"),
    validate: {
      isIn: [["open", "closed"]],
    },
  },
});
///
/// Pages hooks would go here. pages.beforecreate and pages.afterValidate......
Pages.beforeCreate(async (user, options) => {
  console.log("USER!!!!!!!!!##############!");
  console.log(user); // user = req.body
  const slug = await makeSlug(user.title);
  console.log("SLUG#################");
  console.log(slug);
  Pages.slug = slug; // this is a guess?
});

// User.afterValidate('myHookAfter', (user, options) => {
//   user.username = 'Toni';
// });

///
const Users = db.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      // we will reject _ @ $ and any other special characters, for the purposes of this task.
      isAlphanumeric: true,
      notEmpty: true, // passing isAlpha probably means the string is indeed not empty; this is here as a "JUST IN CASE."
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});
/// user hooks would go here
module.exports = {
  db,
  Pages,
  Users,
};
