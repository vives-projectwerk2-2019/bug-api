var mqtt = require('mqtt');
var db = require('./db');

var client  = mqtt.connect('mqtt://127.0.0.1'); // ip van de server waarop de broker zal staan

//JSON string voor input events example
var dataInput = {
    Player: {
        username: "",
        id: 1, 
        input: "", // don't know what this will be yet
        joined: true
    },
    Controller: {
        id: null,
        addons: ["rocket", "speedboost", "anotherthing"]
    }
};
var myDataObj = JSON.stringify(dataInput); // ready to be send as JSON 

//JSON string voor player update 


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
