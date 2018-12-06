
var req = require('request');

req({
   	url: 'http://localhost:5984/test',
   	method: 'GET'
}, function(error, resp, body1){
   	if(error) {
       	console.log(error);
   	} else {
       console.log('-->'+resp.statusCode, body1);
   	}
});
