const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Vérifier la date et l'heure
const checkTime = (req, res, next) => {
    const date = new Date();
    const day = date.getDay();
    const hour = date.getHours();
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
    } else {
    res.send("Désolé, l'application web est disponible uniquement pendant les heures ouvrables (du lundi au vendredi, de 9h à 17h).");
    }
};

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', checkTime, (req, res) => {
    res.render('home');
});

app.get('/services', checkTime, (req, res) => {
    res.render('services');
});

app.get('/contact', checkTime, (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`Le serveur tourne au port: ${port}`);
});
