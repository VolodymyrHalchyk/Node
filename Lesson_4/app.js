const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const apiRouter = require('./routers/api.routers');

_connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', apiRouter);

app.listen(5000, () => {
  console.log('===connect===');
});

function _connectDB() {
  mongoose.connect('mongodb://localhost:27017/owu_lessons', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const { connection } = mongoose;

  connection.on('error', (error) => {
    console.log(error);
  });
}
