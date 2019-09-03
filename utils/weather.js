
// Installed via npm install request@2.88.0
const request = require('request')

const weather = (coordinates, callback) =>
{   
    const weather_url = 'https://api.darksky.net/forecast/d4575126d4588c18d52f493530d4fdf1/' +
                         coordinates.latitude + 
                        ',' +
                         coordinates.longitude + 
                        '?units=si'

    console.log(weather_url);

    request ({ url : weather_url, json: true}, (error, response) =>
    {
        if (error)
        {
            callback('Unable to connect to weather service.', undefined)
        }
        else if(response.body.error)
        {
            callback('No weather information available, '+ response.body.error, undefined)
        }
        else
        {
            callback(undefined, {summary : response.body.daily.data[0].summary, 
                                 forecast : response.body.currently.temperature})
        }
    })
}

module.exports = weather