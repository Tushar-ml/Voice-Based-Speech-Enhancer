// server.js
 
const WebSocket = require('ws')
 
const wss = new WebSocket.Server({ port: 3000 })
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var result = '';
wss.on('connection', ws => {

  ws.on('message', message => {
    /*result = sentiment.analyze(message);
    result = JSON.stringify(result.score);*/
    console.log(`Message Received => ${message}`)

  })
  
  ws.send(result)
})

