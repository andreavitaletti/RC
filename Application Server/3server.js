var express = require('express');
var bodyParser     =        require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', function(req, res){
  res.send('id: ' + req.query.id);
  console.log(req.query.id);
});

app.get('/orario', function(req, res){
  // accedo a DB è prelevo l'orario per il giorno  	req.query.giorno
  // che mi viene restituio sulla stringa ORARIO
  var ORARIO = "risultato da DB";
  res.send('GET orario del treno per il giorno '+req.query.day+': '+ ORARIO);
  console.log("GET"+req.query.day);
});


//curl --data "var1=ciao" http://127.0.0.1:3000

app.post('/', function(req, res){
  res.send('body var: ' + req.body.var1);
  console.log(req.body.var1);
});

app.post('/orario', function(req, res){
  var ORARIO = "risultato da DB";
  res.send('POST orario del treno per il giorno ' + req.body.day + ' ' + ORARIO);
  console.log("POST"+req.body.day);
});

app.listen(8888);
