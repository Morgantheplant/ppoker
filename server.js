var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/room', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/room/:room', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});



app.get('/bundle.js', function(req, res){
  res.sendFile(__dirname + '/public/bundle.js');
});

app.get('/images/cards.jpg', function(req, res){
  res.sendFile(__dirname + '/public/images/cards.jpg');
});

var socketData = {
  users:[]
};

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    var data = socketData[socket.id]
    if(data && data.length === 2){
      io.to(data[0]).emit('message',{
        msg: data[1] + ' left the room',
        left: data[1]
      });
    }
    
  });

  socket.on('roomname', function(room){
    if(!io.sockets.adapter.rooms[room]){
        io.emit('room-available', room)
        socket.join(room)
        console.log(io.sockets.adapter.rooms[room])
    } else {
        io.emit('room-not-available')
    }
  })

  socket.on('joinroom', function(data){
    console.log('user joined ', data)
    socket.join(data.room)
    socketData.users.push({ name: data.name });
    socketData[socket.id] = [data.room, data.name]
    io.to(data.room).emit('message', {
      msg: data.name + ' joined the room',
      joined: socketData.users
    })
  })

  socket.on('message', function(data){
     console.log(data.room, data.msg)
    io.to(data.room).emit('message',{
      name: data.name,
      msg: data.msg
    });
  })


});


http.listen(port, function(){
    console.log('Yalabazooo listening on port '+ port);
});