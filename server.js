var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/bundle.js', function(req, res){
  res.sendFile(__dirname + '/public/bundle.js');
});

app.get('/images/cards.jpg', function(req, res){
  res.sendFile(__dirname + '/public/images/cards.jpg');
});

var rooms = [];

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('roomname', function(room){
    console.log(io.sockets.adapter.rooms[room], '!!!!!!!')
    if(!io.sockets.adapter.rooms[room]){
        io.emit('room-available', room)
        socket.join(room)
        console.log(io.sockets.adapter.rooms[room])
    } else {
        io.emit('room-not-available')
    }
  })

});


http.listen(port, function(){
    console.log('Yalabazooo listening on port '+ port);
});