const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { getTemperature } = require('./utils/getTemperature')

const app = express()

//pointing express to source(src) folder
app.use(express.static(path.join(__dirname, '../public')))
//pointing to views folder
app.set('views', path.join(__dirname, '../templates/views'))
//pointing to partials folder
hbs.registerPartials('../templates/partials')

app.set('view engine', 'hbs');

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Prajjwal Sahu'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Prajjwal Sahu'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Prajjwal Sahu',
    })
})
app.get('/weather', async (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    let data = await getTemperature(req.query.address)
    res.json(data)
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Prajjwal Sahu',
        errorMessage: 'Help Article not Found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Prajjwal Sahu',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running')
})