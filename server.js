"use strict";

var webSocketsServerPort = 3123;
var webSocketServer = require('websocket').server;
var http = require('http');

var clients = [ ];

/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {});
server.listen(webSocketsServerPort, function() {
  console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
  httpServer: server
});

wsServer.on('request', function(request) {
  console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

  var connection = request.accept(null, request.origin);
  // we need to know client index to remove them on 'close' event
  var index = clients.push(connection) - 1;
  var userName = false;

  console.log((new Date()) + ' Connection accepted.');

  // send back chat history
  // if (history.length > 0) {
  //   connection.sendUTF(JSON.stringify( { type: 'history', data: history} ));
  // }

  // user sent some message
  connection.on('message', function(message) {
    var type = '';
    var data = {};
    var json = JSON.parse(message.utf8Data);

    console.log(message.utf8Data);

    if (message.type === 'utf8') {
      type = json.type;
      data = json.data;

      // process message
    }
  });

  // user disconnected
  connection.on('close', function(connection) {
    if (userName !== false) {
      console.log((new Date()) + " Peer "
        + connection.remoteAddress + " disconnected.");
      // remove user from the list of connected clients
      // clients.splice(index, 1);
      // clientNames.splice(index, 1);
    }
  });

});
