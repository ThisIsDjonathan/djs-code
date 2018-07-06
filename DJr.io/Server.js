// Aux player
class Player {
  constructor(id, x, y, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
  }
}

let foods = [];

// Create players array
let players = [];

// Create express app
let express = require('express');
let app = express();

// Set up the server
let server = app.listen(process.env.PORT || 443, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Server started. Listening at http://' + host + ':' + port);
});

// set static content
app.use(express.static('public'));

// Create socket
let io = require('socket.io').listen(server);
setInterval(heartbeat, 30);

// This will send players array to all clients
function heartbeat() {
  io.sockets.emit('heartbeat', players);
}

function onFirstConnection(socket) {
  console.log("First connection!");
  console.log();
  io.removeListener('connection', onFirstConnection);

}

io.sockets.on('connection', onFirstConnection);

// Connection management
io.sockets.on('connection', (socket) => {
    console.log("New client: " + socket.id);

    // When start create a new player with data sended
    socket.on('start', (data) => {
        //let pos = {x: data.x, y: data.y}
        players.push(new Player(socket.id, data.x, data.y, data.r));
      }
    );

    // Update player position
    socket.on('update', (data) => {
      let player;
      for (var i = 0; i < players.length; i++) {
        if (socket.id == players[i].id) {
          player = players[i];
        }
      }

      if(player) {
        player.x = data.x;
        player.y = data.y;
        player.r = data.r;
      }
    });

});


