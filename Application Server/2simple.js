var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/robbamia', function (req, res) {
  res.send('nun tocca');
});

app.get('/rest1', function (req, res) {
  res.send('sono rest 1');
});

app.post('/', function (req, res) {
  res.send('è una post');
});


var server = app.listen(8888, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
