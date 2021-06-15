const request = require('postman-request');
const foreCast =(latitude,longitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=5de9a0b09311a62fce4e0a4bcd2ac0a7&query=${longitude},${latitude}&units=f`;
    request({url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to forecast service');
        }
        else if(response.body.error){
            callback('Unable to get forecast of the location');
        }
        else{
            const {current} = response.body;
            callback(undefined,`${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out.It feels like ${current.feelslike} degrees out.`);
        }
    });
}
module.exports = foreCast