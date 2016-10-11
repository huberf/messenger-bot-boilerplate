var httpMod = require('http')
var bodyParser = require('body-parser')
var BotMod = require('messenger-bot')
var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 3000));

const r = require('request');
const urlHead = 'url_for_external_resource';


var bot = new BotMod({
  token: 'your_api_token',
  verify: 'your_verification_key',
  app_secret: 'your_secret_key'
})

bot.on('test', function(err) {
  console.log('Hey!');
})

bot.on('error', function(err) {
  console.log(err.message)
})
function sendMessage(user, text ) {
  bot.sendMessage(user, {'text': text}, function(err) {});
}

bot.on('message', (payload, reply) => {
  console.log(payload);
  var text = payload.message.text
  var message = payload.message.text;

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) {
      console.log(err);
    }
    if( profile ) {
      if( message == "Hello" ) {
        sendMessage( "Hey user! I'm glad you contacted me!" );
      } else if( message.substring(0, 5)  == "Where" ) {
        // Example api request
        r.get({url: urlHead + 'where', form: {query: message.substring(5, message.length)}}, function(err, httpResponse, body) {
          sendMessage( body );
        });
      } else if( message == "You're a good coder, but you better increase your features game.") {
        var doNothing = true;
      } else {
        sendMessage("You're a good coder, but you better increase your features game.");
      }
    }
  })
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// Used for verifying your bot. Simply change location from "/" to another
// if you want to use "/" as a landing page, etc.
app.get('/', (req, res) => {
  return bot._verify(req, res)
})

// Used for receiving messages. Simply change location from "/" to another
// if you want to use "/" as a landing page, etc.
app.post('/', (req, res) => {
  bot._handleMessage(req.body)
  res.end(JSON.stringify({status: 'ok'}))
})

app.post('/message', function(req, res) {
  console.log(req.body);
  sendMessage(req.body.user, req.body.text);
  res.send({'status': 'success'});
});

httpMod.createServer(app).listen(process.env.PORT || 3000)
