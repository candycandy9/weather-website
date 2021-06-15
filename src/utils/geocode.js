const request = require('postman-request');
const geoCode = (address,callback) =>{
    const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2FuZHktYW5uIiwiYSI6ImNrb2dzZTFyaDBoejIycG54dDRmMnFja2kifQ.mxzN6oC8wOQhfScT7TBwIw`;
    request({url:mapUrl,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services');
        }
        else if(response.body.features.length === 0){
            callback('Unable to find location. Please try other location');
        }
        else{
            const {features} = response.body;
            callback(undefined,{
                longitude: features[0].center[0],
                latitude:features[0].center[1],
                placeName:features[0].place_name

            });
           
        }
    });
}
module.exports = geoCode;