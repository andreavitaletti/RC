var express = require('express');
var app = express();

var obj ={
		"cities": [
        {
            "name": "Roma",
            "value": "33",
        },
		{
            "name": "Milano",
            "value": "34",
        },
    ]
};

app.get('/roma', function (req, res) { // http://localhost:3003/roma
  res.send(obj.cities[0].value);
});

app.get('/get_temp', function (req, res) {
  //1. prendi la città dal parametro city della get
  //2. acceddi all''oggetto corrispondente es: obj.cities[0].value nel caso di Roma
  //3. resituisci il valore
});


app.post('/', function (req, res) {
  res.send('è una post');
});


var server = app.listen(3003, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
