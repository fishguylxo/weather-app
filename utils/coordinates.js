
// Installed via npm install request@2.88.0
const request = require('request')

// Receives an address and sends coordinates back to callback function
const geocode = (address, callback) =>
{
    const coordinates_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
                             encodeURIComponent(address) + 
                            '.json?access_token=pk.eyJ1IjoiZmlzaGd1eSIsImEiOiJjano5cTlzZTIwNDFhM29tcWt5M245NTZjIn0.rpuh9PQgvGOlPP-X8xTyQQ' + 
                            '&limit=1' + 
                            '&autocomplete=false'

    request ({ url : coordinates_url, json: true}, (error, response) =>
    {
        if (error)
        {
            callback('unable to connect to location service \n', undefined)
        }
        else if(response.body.features.length === 0)
        {
            callback('could not locate address given, please supply a valid address.' + 
                     '(make sure optional tab is clear)', 
                      undefined)
        }
        else
        {
            callback(undefined, {location  : response.body.features[0].place_name,
                                 latitude  : response.body.features[0].center[0],
                                 longitude : response.body.features[0].center[1]})
        }
    })
}

module.exports = geocode