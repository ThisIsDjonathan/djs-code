// Aux player
class Player {
  constructor(id, x, y, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
  }
}

class Food {
  constructor() {
      this.pos = {x: Math.floor((Math.random() * -1600) + 1600*2)
        , y: Math.floor((Math.random() * -1600) + 1600*2)};
      this.r = 10;
  }
}

// Create arrays to foods and players
let foods = [];
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

// Create initial foods
for(let i = 0; i < 50; i++) {
  foods[i] = new Food();
}

// This will send players array to all clients
function heartbeat() {
  let data = {players: players, foods: foods};
  io.sockets.emit('heartbeat', data);
}

// Connection management
io.sockets.on('connection', (socket) => {
    console.log("New client: " + socket.id);

    // When start create a new player with received data
    socket.on('start', (data) => {
        players.push(new Player(socket.id, data.x, data.y, data.r));
      }
    );

    // Update player information
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

    // When player eat some food, it will disapear from map
    socket.on('eatFood', (food) => {
      console.log("comeu: " + food);
      foods.splice(food, 1);
      //foods[food] = new Food();
    });

});


