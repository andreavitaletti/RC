var express = require('express');



// Express configuration
var app = express();
var port = 3000;
var code = "";
var token = "";
var client_id = ""; // fill-in
var client_secret = ""; // fill-in

var getCode = "https://accounts.google.com/o/oauth2/auth?client_id="+client_id+"&scope=https://picasaweb.google.com/data/&approval_prompt=force&redirect_uri=http://localhost:3000/code&state=dddfffgdddgg&response_type=code";


app.get('/', function(req, res){

        var info = "nota che test4RC è un'applicazione di vitaletti@dis.uniroma1.it, mentre i dati su picasa sono di andrea.vitaletti@gmail.com"
        res.send(info+"<br><br><button onclick='window.location.href=\""+ getCode +"\"'>Log in with Picasa</button>");
   
});

app.get('/code', function (req, res) {
  res.send('code: ' + req.query.code + "<br><br><button onclick='window.location.href=\"/token\"'>Get Token</button>");
  code = req.query.code;
});


app.get('/token', function(req, res){
	
    var url = 'https://www.googleapis.com/oauth2/v3/token';
	var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
	var body ="code="+code+"&client_id="+client_id+"&client_secret="+client_secret+"&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcode&grant_type=authorization_code";

  
    var request = require('request');


	request.post({
		headers: headers,
		url:     url,
		body: body
		}, function(error, response, body){
			console.log(body );
			res.send(body + "<br><br><button onclick='window.location.href=\"/token_info\"'>Get Token Info</button>" + "<br><br><button onclick='window.location.href=\"/api\"'>Access API</button>");
			my_obj=JSON.parse(body);
			token = my_obj.access_token;
			console.log("The token is: "+token);
		});
    
});

app.get('/token_info', function(req, res){
	
    var url = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+token;
    var request = require('request');

	request.get({
		url:     url
		}, function(error, response, body){
			console.log(body);
			res.send(body+"<br><br><button onclick='window.location.href=\"/api\"'>Access API</button>");
		});
    
});

app.get('/api', function(req, res){
	
    var url = 'https://picasaweb.google.com/data/feed/api/user/andrea.vitaletti';
	var headers = {'Authorization': 'Bearer '+token};
	
  
    var request = require('request');


	request.get({
		headers: headers,
		url:     url,
		}, function(error, response, body){
			console.log(body);
			res.send(body);
		});
    
});


console.log('Server listen in port '+port+'. Connect to localhost');
app.listen(port);
