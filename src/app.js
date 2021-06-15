const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast =  require('./utils/forecast');
const geoCode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

//define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'./templates/views')
const partialsPath = path.join(__dirname,'./templates/partials')

//setup handle bars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static file
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Candy'
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Candy'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Contact for Help',
        title:'Help',
        name:'Candy'
    })
});
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        });
    }
    geoCode(req.query.address,(error,{longitude,latitude,placeName}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                address:req.query.address,
                placeName
            })
        })
    });
});
app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMsg:'Help article not found',
        title:'404',
        name:'Candy'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        errorMsg:'Page not found',
        title:'404',
        name:'Candy'

    })
})

app.listen(port,()=>{
    console.log("Server is up on port 3000")
})