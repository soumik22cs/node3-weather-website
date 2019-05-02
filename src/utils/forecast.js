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
            callback(undefined, response.body.daily.data[0].summary+' It is currently ' +response.body.currently.temperature +' degrees out. There is a ' +response.body.currently.precipProbability +'% chance of rain')
        }
    })
}

module.exports = forecast