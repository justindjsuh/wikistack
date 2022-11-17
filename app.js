const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const Sequelize = require('sequelize');
const layout = require('./views/layout');
const { db, Pages, Users } = require('./models/index.js');
const wikiRoutes = require('./routes/wiki');
const userRoutes = require('./routes/users');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', wikiRoutes); // or could use: app.use('/wiki', require('./routes/wiki'))
// app.use('/users', userRoutes);

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

// apply .sync to Pages and Users. do it here -- bEFORE the listen(Port).
const init = async () => {
  await db.sync({ force: true }); // this syncs Pages & Users. force:true lets us override existing data.
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
};
init();
