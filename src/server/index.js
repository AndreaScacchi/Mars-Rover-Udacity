require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;
const API_KEY = process.env.API_KEY;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use('/', express.static(path.join(__dirname, '../public')));

// Curiosity API call
app.get('/curiosity', async (req, res) => {
    try {
        const date = new Date()
        console.log(date)
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error', err);
    }
})


// Opportunity API call
app.get('/opportunity', async (req, res) => {
    try{
        const date = new Date()
        console.log(date)
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/latest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error', err);
    }
})


// Spirit API call
app.get('/spirit', async (req, res) => {
    try{
        const date = new Date()
        console.log(date)
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/latest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error', err);
    }
})


// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})