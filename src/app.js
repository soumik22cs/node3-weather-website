const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Soumik'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Soumik'
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        title: 'Help Page',
        msg: 'Help will be provided soon!!',
        name: 'Soumik'
    })
})

app.get('/weather',(req, res) =>{
    if(!req.query.address)
    return res.send({
        error: 'Please enter a location'
    })
    geocode(req.query.address, (error, {latitude,longitude, location} ={}) =>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude,(error, forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast : forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res) =>{
    if(!req.query.search)
    return res.send({
        error: 'Please select product'
    })
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) =>{
    res.render('error',{
        title: 404,
        msg: 'Help page not found',
        name: 'Soumik'
    })
})

app.get('*',(req, res) =>{
    res.render('error',{
        title: 404,
        msg: 'Page does not exist',
        name: 'Soumik'
    })
})

app.listen(port, () =>{
    console.log('Listening on port '+ port)
})