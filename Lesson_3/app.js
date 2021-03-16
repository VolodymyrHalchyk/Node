const express = require('express');
const path = require('path');

const app = express();

const apiRouter = require('./routers/api.router');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', apiRouter);

app.set('views', path.join(__dirname, 'static'));
app.listen(5000, () => {
    console.log('===connect===');
});
