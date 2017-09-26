var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
 
app.use(function (req, res, next) {
  console.log('middleware');
  req.received = new Date();
  return next();
});
 
app.get('/', function(req, res, next){
  console.log('get route', req.testing);
  res.end();
});
 
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
      var content = "";
      console.log("msg: " + msg);

      if (msg.indexOf("base64:") == 0) {
        var raw = msg.substr(7);
        console.log(raw);
        content = Buffer.from(raw, 'base64').toString();
      } else {
        content = msg;
      }

      var token = content.substr(0, content.indexOf(':'));
      content = content.replace(token + ":", '');
      var device = content.substr(0, content.indexOf(':'));
      content = content.replace(device + ":", '');

      console.log("token: " + token);
      console.log("device: " + device);
      console.log("content: " + content);
  });
  console.log('socket', req.testing);
});
 
app.listen(3000);