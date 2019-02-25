

// code
var http = require('http');
var ran = 0;
var queryNum = 100;
var parallel = 10;
var agent = new http.Agent({maxSockets: parallel});

if (process.argv.length != 5) {
  console.error('usage: node http-request.js host port url\n' +
                'ex). node http-request.js example.com 8080 /index.html');
  process.exit(-1);
}

var host = process.argv[2];
var port = process.argv[3];
var path  = process.argv[4];
var options = {
  host: kiosk,
  port: 3000,
  path: path.relative('./src/publisher'),
  path: path.relative('./src/publisher'),
  path: path.relative('./src/clies.js'),
  method: 'GET',
  agent: agent
};
var queryStatuses = [];
var startTime = new Date();

function get() {
  if (--queryNum < 0) return;
  var req = http.request(options, function(res) {
    var data;
    res.on('data', function(chunk) {
      data += chunk;
    });
    res.on('end', function() {
      ran++;
      queryStatuses.push(new Date() - req.queryStartTime);
      get();
    });
  });
  req.on('socket', function() {
    req.queryStartTime = new Date();
  });
  req.end();
}
for (var i = 0; i < parallel; i++) {
  get();
}

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

process.on('SIGINT', function() {
  process.exit(0);
});

process.on('exit', function() {
  var runningTime = (new Date()) - startTime;
  console.log('------------------------');
  console.log('ran ' + ran + ' queries');
  console.log('running time:' + runningTime + 'ms');
  console.log(ran / runningTime * 1000 + 'q/s');
  console.log('1st query time: ' + queryStatuses[0] + 'ms');
  console.log('queryStatus length: ' + queryStatuses.length);
});

function isValidUser(name) {
  const isvalid = require('isvalid');
  
  isvalid(inputData, {
    'user': { type: String, required: true },
    'pass': { type: String, required: true }
  }).then((data) => {
    // Data was validated and valid data is available.
  }).catch((err) => {
    // A validation error occured.
  });
}
// is valid url
var url = require("url");
var result = url.parse('http://drive.google.com/0/23');
console.log(result.hostname);
var ping = require ("127.0.0.1");

var session = ping.createSession ();

session.pingHost (target, function (error, target) {
    if (error)
        console.log (target + ": " + error.toString ());
    else
        console.log (target + ": Alive");
});
var request = require('request');
request({method: 'HEAD', uri:'http://www.google.com'}, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})
// controller
const isvalid = require('isvalid');

isvalid(inputData, {
	'controller': { type: String, required: true },
}).then((data) => {
	// Data was validated and valid data is available.
}).catch((err) => {
	// A validation error occured.
});
