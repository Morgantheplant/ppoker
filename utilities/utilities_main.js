module.exports = {

removeUser: function removeUser(username, roomname, id, cb){
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
},

startTimer: function startTimer(data, tick, end){
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
},

pauseTimer: function pauseTimer(data, reset){
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
},

timer: function timer(data, tick, end){
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
},


updateUserClick: function updateUserClick(data){
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
      this.pauseTimer(data, true)
      io.to(data.room).emit('message', {
          msg: 'pick made!!'
      })
    }
  } else {
    console.log('Warning: could not find room card pick not updated')
  }
},

picksLeft: function picksLeft(data){
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
},

resetAllUsers: function resetAllUsers(data){
  var roomData = socketData[data.room];
  if(roomData && roomData.users){
     roomData.users.forEach(function(user){
        user.pick = null;
     })
  } else {
    console.log('could not find room to reset users')
  }
}