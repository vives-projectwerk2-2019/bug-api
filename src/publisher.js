/*THIS FILE WILL BE REFACTORED OVER TIME*/ 
/*THIS FILE WILL BE REFACTORED OVER TIME*/ 
/*THIS FILE WILL BE REFACTORED OVER TIME*/ 
/*THIS FILE WILL BE REFACTORED OVER TIME*/ 

var mqtt = require('mqtt');
var db = require('./db');

var client  = mqtt.connect('mqtt://localhost'); // ip van de server waarop de broker zal staan

function Publisher(button, newhardware){ //not used for the moment
  this.button = JSON.parse(button); 
  this.newhardware = JSON.parse(newhardware);
}



client.on('connect', function () {

    setInterval(function() {
        client.publish('API', 'Hello mqtt'); TODO://publish to game server in JSON format
        console.log('Publisher: Message Sent');

        // Database example
        db.pool.getConnection()
            .then(conn => {
              console.log("connected ! connection id is " + conn.threadId);

              conn.query("INSERT INTO users (username, password) VALUES (\"api\", \"api\")")
                .then(rows => {
                  console.log(rows);
                });
              conn.query("SELECT username FROM users")
                .then(rows => {
                  console.log(rows);
                  dataInput.Player.name = rows[0].username; //need to test
                  console.log(rows[0].username);
                  console.log(rows[0].password);
                });
              conn.query("SELECT id FROM users")
                .then(rows => {
                  console.log(rows);
                  dataInput.Player.id = rows[0].id; //need to test
                });  

              conn.end(); //release to pool
            })
            .catch(err => {
              console.log("not connected due to error: " + err);
            });

    }, 1000);
});
