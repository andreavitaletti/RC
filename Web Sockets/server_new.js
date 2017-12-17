// https://github.com/websockets/ws

const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

var active_connection = null;
/*
app.use(function (req, res) {
  res.send({ msg: "hello" });
});
*/
app.get('/send_message', function(req, res){
  active_connection.send('something else');
  res.send("messaggio inviato");
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  active_connection = ws;
  ws.send('something');
});

server.listen(9998, function listening() {
  console.log('Listening on %d', server.address().port);
});
