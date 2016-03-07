var express = require('express');
var app = express();
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var httpRoot = require('http');
var http = httpRoot.Server(app);
var config = require ('./config')



app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
   console.log('got the code', code)
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

app.get('/login',function(req, res){
  code = req.query.code;

  res.sendFile(__dirname + '/public/success.html');

  var options = {
      grant_type: 'authorization_code',
      hostname: 'https://app.asana.com/-/oauth_token',
      client_id: config.client_id,
      client_secret: config.client_secret,
      redirect_uri: config.redirect_uri,
      code: code,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }       
  };

  console.log(options)
  // Set up the request
  var post_req = httpRoot.request(options, function(res) {
     console.log('request')
  });

  // post the data
  //post_req.write();
  //post_req.end();

  
});

var socketData = {};

function removeUser(username, roomname, id, cb){
  if(socketData[roomname]){
    var userList = socketData[roomname].users, found;
    for(var i = 0; i < userList.length;i++){
       if(userList[i].name === username){
        found = true; 
        break;
       }
    }
    if(found){
      var user = userList[i].name
      userList.splice(i,1);
      cb && cb("User "+ user +" successfully cleaned from data");
    } else {
      console.log(username,roomname, 'loooook', socketData)
      cb && cb("WARNING: username not found");
    }
  } else {
    cb && cb("WARNING: room not found");
  }
}

function startTimer(data, tick, end){
  var roomname = data.room;
  var roomData = socketData[roomname];
  if(roomData){
    if(roomData.timerOn){
      pauseTimer(data, tick, end)
    } else{
      roomData.timerOn = true;
      roomData.time = data.limit || roomData.resume || 30
      timer(data, tick, end); 
    }
  } else {
    console.log('room not found could not start timer')
  }
}

function pauseTimer(data, reset){
  var roomData = socketData[data.room];
  if(roomData){
    roomData.timerOn = false;
    if(!reset){
      roomData.resume = roomData.time
    }
    clearTimeout(roomData.timeout);
  } else {
    console.log('room not found could not pause the timer')
  }
}

function timer(data, tick, end){
  var roomData = socketData[data.room];
  if(roomData){
    var time = roomData.time;
    var on = roomData.timerOn;
    var timeout;
    tick({time:time,
      room: data.room
    })
    if(time > -1 && on){
      roomData.time--;
      roomData.timeout = setTimeout(function(){
        timer(data, tick, end);
      }, 1000);
    }
    if(time === 0 && on){
      roomData.timerOn = false;
      roomData.time = 30;
      roomData.resume = null
      console.log('timer finished')
      var notPicked = roomData.users.filter(function(item){
         if(!item.pick){
           return item.name
         }
      })
      console.log(notPicked, 'these users havent picked');
      //end(data);  
    }
  } else {
    console.log('room not found timer cannot continue')
  }
}


function updateUserClick(data){
  var roomData = socketData[data.room];
  if(roomData){
    var userList = roomData.users;
    //todo: build helper method
    var fibNumbers = [1,2,3,5,8,13,21,34,55,89];
    userList.forEach(function(user, index){
      if(user.name === data.name){
        user.pick = fibNumbers[data.index]
      }
    })

    // todo: move into function
    var notPicked = roomData.users.filter(function(item){
         if(!item.pick){
           return item.name
         }
    })
    if(notPicked.length===0){
      //todo: move into function rest user picks and tally score
      pauseTimer(data, true)
      io.to(data.room).emit('message', {
          msg: 'pick made!!'
      })

    }
  } else {
    console.log('could not find room card pick not updated')
  }
}


io.on('connection', function(socket){
  console.log('a user connected');
  
  // handle a user joining
  socket.on('joinroom', function(data){
    var roomname = data.room, username = data.name,
    userInfo = { name: username, pick:null };
    // if room doesn't already exist init room data
    if(!socketData[roomname]){
      socketData[roomname] = {
        users: [],
        time: 0,
        timerOn: false
      };
    }
    // add user to room and keep track of user data
    socket.join(roomname)
    socketData[roomname].users.push(userInfo)
    io.to(roomname).emit('addUser',{userList: socketData[roomname].users})
    //todo: handle joining multiple rooms
    if(socketData[socket.id]){
       console.log('multiple rooms is not supported')
        io.to(roomname).emit('message', {
          msg: 'Note: joining multiple rooms is not supported',
        })
    }  
    // store room info by socketid to id who leaves 
    socketData[socket.id] = [roomname, username]
    // notify room that user has joined
    io.to(roomname).emit('message', {
      msg: username + ' joined the room'
    })
  })

  // handle a user leaving
  socket.on('disconnect', function(){
    console.log('a user disconnected')
    var data = socketData[socket.id];
    //see if they joined a room
    if(data && data.length === 2){
      var roomname = data[0];
      var username = data[1];
      // tell room that user left
      io.to(roomname).emit('message',{
        msg: username + ' left the room'
      });

      io.to(roomname).emit('removeUser', username)
      // remove user from data
      removeUser(username, roomname, socket.id, function(message){
         console.log(message);
      })
    }
  });
  
  //picking a roomname from home
  socket.on('roomname', function(room){
    if(!io.sockets.adapter.rooms[room]){
        io.emit('room-available', room)
        socket.join(room)
        console.log(io.sockets.adapter.rooms[room])
    } else {
        io.emit('room-not-available')
    }
  })

  //starting the room timer 
  socket.on('startTimer', function(data){
    startTimer(data, 
      function onTick(data){
        io.to(data.room).emit('updateTimer', data)
      }, 
      function onEnd(data){
        io.to(data.room).emit('addUser',{userList: socketData[data.room].users})
    });
  })

  socket.on('clickedCard', function(data){
    updateUserClick(data)
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