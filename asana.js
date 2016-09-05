var db = require("./db");
var config = require ("./config")
var errorhandler = require("errorhandler")
var  passport = require("passport")
var util = require("util")
var AsanaStrategy = require("passport-asana").Strategy;
var passport = require("passport");
var asanaAccessToken;
var querystring = require("querystring");


passport.use('Asana', new AsanaStrategy({
    clientID: config.ASANA_CLIENT_ID,
    clientSecret: config.ASANA_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/asana/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    asanaAccessToken = accessToken;
    process.nextTick(function () {
      
      return done(null, profile);
    });
  }
));

function getTasks(req, res) {
  var url ="/api/1.0/projects"
  var postBase = "app.asana.com";
  var options = {
    host: postBase,
    port: 443,
    path: url,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + asanaAccessToken,
    }
  };
  var asanaReq = https.request(options, function(asanaRes) {
    asanaRes.on('data', function(chunk) {
      console.log(chunk + "");
      res.send(chunk);
    });
    asanaRes.on('error', function(e){
      console.log(e.message);
    });
  });

  asanaReq.end();
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use( passport.initialize());

app.get('/auth/asana/callback', 
  passport.authenticate('Asana', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

app.use(errorhandler());
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/asana', passport.authenticate('Asana', { failureRedirect: '/login' }));

app.get('/projects', function(req, res){
  getTasks(req, res);
})