var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
//var config = require ('./config')
var https = require('https');
var querystring = require('querystring');
var db = require('./db')

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


app.get('/public/images/*', function(req, res){
  res.sendFile(__dirname + req.path)
});

app.get('/public/styles.min.css', function(req, res){
  res.sendFile(__dirname + '/public/styles.min.css'); 
})

// app.get('/login',function(req, res){
//   var code = req.query.code;
  
//   var req_body = querystring.stringify({
//       grant_type: 'authorization_code',
//       client_id: config.client_id,
//       client_secret: config.client_secret,
//       redirect_uri: config.redirect_uri,
//       code: code
//   });

//   var options = {
//       hostname: 'https://app.asana.com',
//       path: '/-/oauth_token',
//       method: 'POST',
//       port: 80,
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }       
//   };

//   console.log(options)
//   // Set up the request
//   var post_req = https.request(options, function(response) {
//      console.log('request')
//      res.sendFile(__dirname + '/public/success.html');
//   });

//   post_req.on('error', function(e) {
//     console.log(`problem with request: ${e.message}`);
//   });

//   // post the data
//   post_req.write(req_body);
//   post_req.end();

//   console.log('I got here')

  
// });

// maintain a list of tASKS that gets updated 
// when a user presses start begin countdown and reset picks for all users 
  // make a list of all users in the room
   // prevent tasks from being selectd during countdown
    // as users sumbit votes remove them from the list
       // when no more votes are left tally the scores and present them
    // if timer runs out wait for all players to finish voting
    // once a task is voted on it's final score is presented  



var socketData = {
  roomname: { // room data model
    users: [],
    timerOn: false,
    time: 0,
    timeout: {},
    limit: 0,
    resume: false,
    tasks: [],
    selectedTask: {}
  }
};

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
  // todo: only start timer if more than 1 user and a task is selected
  // move this logic out of the timer function
  var roomname = data.room;
  var roomData = socketData[roomname];
  if(roomData){
    //if timer is already on pause it
    if(roomData.timerOn){
      data.timerOn = false;
      pauseTimer(data, tick, end)
    } else{
      resetAllUsers(data);
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
    //send out updated time
    tick({
      time:time,
      room: data.room,
      timerOn: on
    })
    // keep loooping through timer if on 
    if(time > -1 && on){
      roomData.time--;
      roomData.timeout = setTimeout(function(){
        timer(data, tick, end);
      }, 1000);
    }
    if(time === 0 && on){
      //reset timer 
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

    if(picksLeft(data).length===0){
      pauseTimer(data, true)
      tallyScores(data);
      io.to(data.room).emit('message', {
          msg: 'all pick made!'
      })
    }
  } else {
    console.log('Warning: could not find room card pick not updated')
  }
}

function tallyScores(data){
  var roomData = socketData[data.room];
  if(roomData){
    var userList = roomData.users;
  } else {
    console.log('something went wrogn in tallying scores')
  }  
}

function picksLeft(data){
  var roomData = socketData[data.room];
  if(roomData){
    return roomData.users.filter(function(item){
      if(!item.pick){
        return item.name
      }
    });
      
  } else {
     console.log('Warning: something went wrong with checking picks')
     return [];
  }
}

function resetAllUsers(data){
  var roomData = socketData[data.room];
  if(roomData && roomData.users){
     roomData.users.forEach(function(user){
        user.pick = null;
     })
  } else {
    console.log('could not find room to reset users')
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
        timerOn: false,
        time: 0,
        timeout: {},
        limit: 0,
        resume: false,
        tasks: [],
        selectedTask: {}
      };
    }
    // add user to room and keep track of user data
    socket.join(roomname)
    socketData[roomname].users.push(userInfo)
    io.to(roomname).emit('addUser',{userList: socketData[roomname].users, tasks: socketData[roomname].tasks })
    //todo: handle joining multiple rooms
    if(socketData[socket.id]){
       console.log('multiple rooms is not supported')
        io.to(roomname).emit('message', {
          msg: 'Note: joining multiple rooms is not supported'
        })
    }  
    // store room info by socketid to id who leaves 
    socketData[socket.id] = [roomname, username]
    // notify room that user has joined
    io.to(roomname).emit('message', {
      msg: username + ' joined the room'
    })
  })

  socket.on('addTask', function(data){
    socketData[roomname].tasks.push(data.task);
    io.to(data.room).emit('addTask',{
      tasks: socketData[roomname].tasks
    });
  })

  socket.on('nextTask', function(data){
    io.to(data.room).emit('nextTask',{});
  })
  
  socket.on('prevTask', function(data){
    io.to(data.room).emit('prevTask',{});
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
    io.to(data.room).emit('message',{
      name: data.name,
      msg: data.msg
    });
  })

});


http.listen(port, function(){
    console.log('Yalabazooo listening on port '+ port);
});