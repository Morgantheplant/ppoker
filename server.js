var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 3000;
var moment = require("moment");

app.get("/room/:room", function(req, res){
  res.sendFile(__dirname + "/public/");
});

app.use(express.static(__dirname + "/public"));

var socketData = {
  roomname: { 
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
      var user = userList[i].name;
      userList.splice(i,1);
      cb && cb("User "+ user +" successfully cleaned from data");
    } else {
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
    //if timer is already on pause it
    if(roomData.timerOn){
      data.timerOn = false;
      pauseTimer(data, false);
    } else{
      resetAllUsers(data);
      roomData.timerOn = true;
      roomData.time = roomData.time || data.limit || 30;
      timer(data, tick, end); 
    }
  } else {
    console.log("room not found could not start timer");
  }
}

function pauseTimer(data, reset){
  var roomData = socketData[data.room];
  if(roomData){
    roomData.timerOn = false;
    if(reset){
      console.log("pause got here in the timer ", roomData.limit);
      // if reset isn't listed then set time to limit or 29
      roomData.time = (roomData.limit) ? roomData.limit - 1 : 29;
    }

    console.log("rooom timer paused", roomData.timerOn, "time: ", roomData.time);
    io.to(data.room).emit("updateTimer", {
      time: roomData.time + 1,
      timerOn: false,
      inProgress: !reset
    });
    clearTimeout(roomData.timeout);
  } else {
    console.log("room not found could not pause the timer");
  }
}

function timer(data, tick, end){
  var roomData = socketData[data.room];
  if(roomData){
    var time = roomData.time;
    var on = roomData.timerOn;
    //send out updated time
    tick({
      time:time,
      room: data.room,
      timerOn: on,
      inProgress: true
    });
    // keep looping through timer if on 
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
      roomData.resume = null;
      roomData.inProgress = false;
      io.to(data.room).emit("updateTimer", {
        time: 0,
        timerOn: false,
        inProgress: false
      });
      var notPicked = roomData.users.filter(function(item){
        if(!item.pick){
          return item.name;
        }
      });
      console.log(notPicked, "these users havent picked");
      
      var usersNp = notPicked.reduce(function(prev, curr, index){
        var comma = (index == 0 || index == this.length ) ? "" : ", ";
        return prev + comma + curr.name;
      }.bind(this),"");

      io.to(data.room).emit("notification",
        { message: "these users haven't picked: " + usersNp }); 
    }
  } else {
    console.log("room not found timer cannot continue");
  }
}


function updateUserClick(data){
  var roomData = socketData[data.room];
  if(roomData){
    var userList = roomData.users;
    //todo: build helper method
    var fibNumbers = [1,2,3,5,8,13,21,34,55,89];
    userList.forEach(function(user){
      if(user.name === data.name){
        user.pick = fibNumbers[data.index];
      }
      return user;
    });

    if(picksLeft(data).length===0){
      pauseTimer(data, true);
      var score = tallyScores(data);
      var selectedTask = roomData.selectedTask;
      roomData.tasks[selectedTask.index].score = score;
      selectedTask.score = score;
      io.to(data.room).emit("doneVoting",{
        userList: socketData[data.room].users,
        score: score, 
        tasks: roomData.tasks,
        selectedTask: roomData.selectedTask
      });
    }
  } else {
    console.log("Warning: could not find room card pick not updated");
  }
}

function tallyScores(data){
  var roomData = socketData[data.room];
  if(roomData){
    var userList = roomData.users;
    var rawScores = userList.map(function(user){
      if(user.pick > -1){
        return user.pick;
      } else {
        console.log("error: user pick fail, missing user.pick  ");
      }
    });
    var totals = rawScores.reduce(function(curr, prev){
      return curr + prev;
    });
    var numOfUsers = rawScores.length;  
    //throw out highest and lowest score if more than 4 users
    if(numOfUsers > 4){
      var highest = Math.max.apply(null, rawScores);
      var lowest = Math.min.apply(null, rawScores);
      totals = totals - highest - lowest;
      numOfUsers -= 2;
    }

    var fibNumbers = [1,2,3,5,8,13,21,34,55,89];
    var average = Math.floor(totals/numOfUsers);
    for (var i = 0; i < fibNumbers.length; i++) {
      if(fibNumbers[i] >= average){
        return fibNumbers[i];
      }
    }
    
  } else {
    console.log("something went wrogn in tallying scores");
  }  
}

function picksLeft(data){
  var roomData = socketData[data.room];
  if(roomData){
    return roomData.users.filter(function(item){
      if(!item.pick){
        return item.name;
      }
    });
      
  } else {
    console.log("Warning: something went wrong with checking picks");
    return [];
  }
}

function resetAllUsers(data){
  var roomData = socketData[data.room];
  if(roomData && roomData.users){
    roomData.users.forEach(function(user){
      user.pick = null;
    });
    //make sure task data is reset here and sent back to rooms
    io.to(data.room).emit("beginVoting", {
      task: roomData.selectedTask.description,
      tasks: roomData.tasks,
      selectedTask: roomData.selectedTask
    }); 
  } else {
    console.log("could not find room to reset users");
  }
}



io.on("connection", function(socket){
  console.log("a user connected");
  // handle a user joining
  socket.on("joinroom", function(data){
    var roomname = data.room, username = data.name,
      userInfo = { name: username, pick:null, num: Math.ceil(Math.random()*25) };
    // if room doesn't already exist init room data
    if(!socketData[roomname]){
      socketData[roomname] = {
        users: [],
        timerOn: false,
        time: 0,
        timeout: {},
        limit: 30,
        resume: false,
        tasks: [],
        selectedTask: { index: -1}
      };
    }
    // add user to room and keep track of user data
    socket.join(roomname);
    socketData[roomname].users.push(userInfo);
    io.to(roomname).emit("addUser",{userList: socketData[roomname].users });
    // update task list only for newly joining user
    io.to(socket.id).emit("addTask", {tasks: socketData[roomname].tasks, selectedTask: {}});
    //todo: handle joining multiple rooms
    if(socketData[socket.id]){
      console.log("multiple rooms is not supported");
      io.to(roomname).emit("message", {
        msg: "Note: joining multiple rooms is not supported",
        time: moment().format("h:mm  a")
      });
    }  
    // store room info by socketid to id who leaves 
    socketData[socket.id] = [roomname, username];
    // notify room that user has joined
    io.to(roomname).emit("message", {
      msg: username + " joined the room",
      time: moment().format("h:mm  a")
    });
  });

  socket.on("addTask", function(data){
    var roomname = data.room;
    var tasks = socketData[roomname].tasks;
    // assign new index to task
    data.task.index = tasks.length;
    tasks.push(data.task);
    io.to(roomname).emit("addTask",{
      tasks: tasks
    });
  });

  socket.on("nextTask", function(data){
    var room = socketData[data.room];
    var tasks = room.tasks;
    var oldIndex = room.selectedTask.index;
    var nextIndex = oldIndex+1;
    if( tasks[oldIndex] && nextIndex < tasks.length){
      tasks[oldIndex].selected = null;
      tasks[nextIndex].selected = true;
      room.selectedTask = tasks[nextIndex];
      io.to(data.room).emit("nextTask",{
        tasks: tasks,
        selectedTask: tasks[nextIndex]
      });
    }        
  });

  socket.on("selectTask", function(data){
    var room = socketData[data.room];
    var tasks = room.tasks;
    var newIndex = data.task.index;
   
    tasks.forEach(function(task, index){
      if(index === newIndex){
        task.selected = true;
        return task;
      } else {
        task.selected = null;
        return task; 
      }
    });
    room.selectedTask = data.task;
    io.to(data.room).emit("selectTask", {
      tasks: tasks,
      selectedTask: data.task
    });
  });
  
  socket.on("prevTask", function(data){
    var room = socketData[data.room];
    var tasks = room.tasks;
    var oldIndex = room.selectedTask.index;
    var prevIndex = oldIndex-1;
    if(prevIndex > -1){
      tasks[oldIndex].selected = null;
      tasks[prevIndex].selected = true;
      room.selectedTask = tasks[prevIndex];
      io.to(data.room).emit("prevTask",{
        tasks: tasks,
        selectedTask: tasks[prevIndex]
      });
    }
  });


  // handle a user leaving
  socket.on("disconnect", function(){
    console.log("a user disconnected");
    var data = socketData[socket.id];
    //see if they joined a room
    if(data && data.length === 2){
      var roomname = data[0];
      var username = data[1];
      // tell room that user left
      io.to(roomname).emit("message",{
        msg: username + " left the room",
        time: moment().format("h:mm  a")
      });

      io.to(roomname).emit("removeUser", username);
      // remove user from data
      removeUser(username, roomname, socket.id, function(message){
        console.log(message);
      });
    }
  });
  
  //picking a roomname from home
  socket.on("roomname", function(room){
    if(!io.sockets.adapter.rooms[room]){
      io.emit("room-available", room);
      socket.join(room);
      console.log(io.sockets.adapter.rooms[room]);
    } else {
      io.emit("room-not-available");
    }
  });

  //starting the room timer 
  socket.on("startTimer", function(data){
    startTimer(data, function onTick(data){
      io.to(data.room).emit("updateTimer", data);
    }, 
    function onEnd(data){
      io.to(data.room).emit("addUser",{
        userList: socketData[data.room].users
      });
    });
  });

  socket.on("clickedCard", function(data){
    updateUserClick(data);
  });

  
  socket.on("message", function(data){
    io.to(data.room).emit("message",{
      name: data.name,
      msg: data.msg,
      time: moment().format("h:mm  a")
    });
  });

});


http.listen(port, function(){
  console.log("Yalabazooo listening on port "+ port);
});
