const express = require('express');
const expressHbs = require('express-handlebars');

const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'static'));
app.listen(5000, () => {
    console.log('===connect===');
});

app.get('/registration', (req, res) => {
    res.render('registration');
});

app.post('/registration', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.txt'), (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const {email} = req.body;
        const users = JSON.parse(data.toString());

        if (users.find(user => user.email === email)){
            res.redirect('/registration/error');
            return
        }

        users.push(req.body);
        fs.writeFile(path.join(__dirname, 'users.txt'), JSON.stringify(users), err1 => {
            if (err1) console.log(err1);
        });
        res.redirect('/users');
    })
});

app.get('/registration/error', (req, res) => {
    res.render('error', {emailFalse: true});
});

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.txt'), (err, data) => {
        if (err) {
            console.log(err);
            return
        }

        const {email, password} = req.body;
        const users = JSON.parse(data.toString());
        const search = users.findIndex(user => user.email === email && user.password === password);

        if(search === -1){
            res.redirect('/login/error');
            return;
        }

        res.redirect(`/users/${search}`)
    })
})

app.get('/login/error', (req, res) => {
    res.render('error', {loginFalse: true})
})

app.get('/users', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.txt'), (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const users = JSON.parse(data.toString());
        res.render('users',{users: users});
    })
});

app.get('/users/:id', (req, res) => {
    fs.readFile(path.join(__dirname, 'users.txt'), (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        const {id} = req.params;
        const users = JSON.parse(data.toString());

        res.render('chosenUser',{chosenUser: users[id]});
    })
});

