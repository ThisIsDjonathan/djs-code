// Create the app
var express = require('express');
var app = express();

// Set up the server
var server = app.listen(3000);

// set static content
app.use(express.static('public'));


// WebSocket Portion WebSockets work with the HTTP server
var io = require('socket.io')(server);
setInterval(heartbeat, 33);

function heartbeat() {
  io.sockets.emit('heartbeat');
}

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function(socket) {
    console.log("We have a new client: " + socket.id);

    socket.on('start',
      function(data) {
        console.log(socket.id + " sdads");
      }
    );

    socket.on('update',
      function(data) {
      }
    );

    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);
