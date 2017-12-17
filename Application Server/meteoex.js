var express = require('express');
var bodyParser     =        require("body-parser");
var req = require('request');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/meteo', function(req, res){
  //1. Prelevo la città dalla form req.body.city vedi form_meteo.html
  //2. Faccio la chiamata REST a METEO_REST.COM --> http://localhost:3003/roma --> http://localhost:3003/ + req.body.city
  //3. Scrivo i dati su DB con chiamata REST --> scrivi_db()
  //4. Rispondo all'utente  res.send...	
  
});

function scrivi_db(city, val){

// curl -X PUT http://127.0.0.1:5984/my_database/"001" -d '{ " city " : city , " val" :val }'


req({
    url: 'http://127.0.0.1:5984/DB/"001"', //URL to hit
    qs: {city: city, val: value}, //Query string data
    method: 'PUT',
    headers: {
        'HTML Form URL Encoded': 'application/x-www-form-urlencoded'
    },
    //body: 'Hello Hello! String body!' //Set the body as a string
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});

}

app.listen(3000);
