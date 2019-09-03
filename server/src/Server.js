
// dynamically-linked shared objects written in c++
const get_coordinates = require('../utils/coordinates.js');
const get_weather     = require('../utils/weather.js');
const countries_list  = require('../utils/countries');
const express         = require('express');
const cors            = require('cors');

// Installed via npm install -save express
// Loads up the top-level function exported by the express module.
const app = express();

// Use Access-Control-Allow-Origin to allow a different local
// host to use our application.
app.use(cors());

// Define port number as 3001
const port = 3001;

// Make the app listen on port 3001
app.listen(port, () =>
{
    console.log('Server listening on http://localhost:' + port);
});

// Routes HTTP GET requests to the specified path "/" with the specified callback function
//
//  General flow:
//  app.get('/weather, [query]) => get_coordinates(address) => 
//  get_weather(coordinates) => callback(message) => response.send(message).  
//
app.get('/weather', (request, response) =>
{   
    if (request.query.address)
    {
        display_weather(request.query.address, (weather_message) =>
        {
            response.json(weather_message);
        })
    }
    else
    {
        response.json('No address as been supplied');
    }
});

app.get('/countries', (request, response) =>
{   
    response.json(countries_list);
});

// Calls coordinates.js and weather.js modules to address received to 
// the daily weather forecast of that address.
const display_weather = (address, callback) =>
{
    get_coordinates(address, (error, coordinates) => 
    {        
        if (error)
        {
            console.log(error)
            callback (error)
        }
        else
        {
            get_weather(coordinates, (error, weather) => 
            {
                if (error)
                {
                    console.log(error)
                    callback (error)
                }
                else
                {
                    callback ('The weather today in ' + coordinates.location +
                              ' is currently ' + weather.forecast + ' degrees celsius. \n' +
                              'its going to be a ' + weather.summary + '\n')
                }       
            })
        }
    })
}
