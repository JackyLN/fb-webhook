'use strict';

const 
  logger = require('./winston'),
  bodyParser = require('body-parser'),
  express = require('express'),
  path = require('path'),
  config = require('./config');

let app = express();
app.use(bodyParser.json());

//var xhub = require('express-x-hub');
//app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));


var token = process.env.TOKEN || 'token';
var received_updates = [];

app.get('/', function(req, res) {
  console.log(req);
  res.send('<pre>' + JSON.stringify(received_updates, null, 2) + '</pre>');
});

//app policy
app.get('/policy', function (req, res) {
  res.sendFile(path.join(__dirname + '/policy.html'));
})

app.get(['/facebook', '/instagram'], function(req, res) {
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === config.webhook.verify_token) {

      // Responds with the challenge token from the request
      //console.log('WEBHOOK_VERIFIED');
      //
      logger.info('WEBHOOK_VERIFIED');

      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

app.post('/facebook', function(req, res) {
  
  logger.info("Facebook request body:" + req.body);

  // Process the Facebook updates here
  received_updates.unshift(req.body);
  res.sendStatus(200);
});

app.post('/instagram', function(req, res) {
  
  logger.info("Instagram request body:" + req.body);
  
  // Process the Instagram updates here
  received_updates.unshift(req.body);
  res.sendStatus(200);
});


app.use(express.static('logs'));
// Sets server port and logs message on success
app.listen(config.webhook.PORT || 1334, () => {
  logger.info('webhook is listening')
  console.log('webhook is listening')
});