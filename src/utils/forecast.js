const request =require('request')

const forecast= (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/3a125a01bc54274eb206a0129979b5b2/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'

    request({ url, json:true},(error,response)=>{
        if (error){
            callback('Unable to connect', undefined)
        }
        else if(response.body.error){
            callback('Location not found', undefined)
        }
        else{
            callback(undefined,'The high today is '+ response.body.daily.data[0].temperatureHigh+' deg c and low today is '+ response.body.daily.data[0].temperatureLow+ ' deg c. It is currently ' +response.body.currently.temperature +' degrees out. There is a ' +(response.body.currently.precipProbability)*100 +'% chance of rain.')
        }
    })
}

module.exports = forecast