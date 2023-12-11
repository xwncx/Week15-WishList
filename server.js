const express = require('express');
const wish = require('./model/wish');
const { fetchAllWishes } = require('./model/wish'); 
const { urlencoded, static } = require('express'); 

const app = express();

app.set('view engine', 'ejs');
app.use(urlencoded({ extended: true }));
app.use(static('public'));

app.get('/', (req, res) => {
    fetchAllWishes(wishesFromFile => {
        console.log(wishesFromFile);
        res.render('index', { MyWishes: wishesFromFile });
    });
});

app.post('/wish', (req, res) => {
    let userData = req.body.userWish;

    let newWish = new wish(userData);
    newWish.saveWish();
    res.redirect('/');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
