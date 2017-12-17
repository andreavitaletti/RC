var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/', function (req, res) {
  res.send('è una post');
});

app.post('/insert', function(req, res){
	
    var url = 'http://localhost:1026/v1/updateContext';
	var headers = { 
    'Content-Type': 'application/json',
    'Accept' : 'application/json'
	};
	var body1 ={
    "contextElements": [
        {
                    "type": "User",
                    "isPattern": "false",
                    "id": "8642229",
            "attributes": [
            {
                "name": "Systolic",
                "type": "integer",
                "value": 170
            },
            {
                "name": "Diastolic",
                "type": "integer",
                "value": 67
            }
            
            
            ]
        }
    ],
    "updateAction": "APPEND"
	}
  
    var request = require('request');


	request.post({
		headers: headers,
		url:     url,
		body: JSON.stringify(body1)
		}, function(error, response, body){
			console.log(body);
			res.send(body);
		});
    
});


app.get('/retrieve', function(req, res){
    
    var url = 'http://localhost:1026/v1/queryContext';
	var headers = { 
    'Content-Type': 'application/json',
    'Accept' : 'application/json'
	};
	
var body1 ={
    "entities": [
        {
            "type": "User",
            "isPattern": "false",
            "id": "8642229"
        }
    ]
} 
  
    var request = require('request');

	request.post({
		headers: headers,
		url:     url,
		body: JSON.stringify(body1)
		}, function(error, response, body){
			console.log(body);
			res.send(body);
		});
    
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
