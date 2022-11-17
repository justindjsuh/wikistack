const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const layout = require('./views/layout');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.send(layout(''));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
