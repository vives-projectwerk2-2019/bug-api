/*./src/http.js requiren om daarna functies aan te roepen voor deze file */
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://' + process.env.BROKER_HOST); //ip van de server?
var ttndata = "";
//var http = require('./http_request');

var Jsonvalidator = require('./jsonvalidator');


/* The actual data object that needs to be validated before sending to game */
var dataObject = {
    Player: {
        username: "",
        movement: null,
        dev_id: null, 
        action: null, 
        joined: true
    },
    Controller: {
        id: 0,
        addons: [null, null, null], 
        dev_id: ""
    }
};

//This will subscribe the client on TTN and publish the right JSON object to game server!
client.on('connect', function () {
        client.subscribe('TTN');
        client.subscribe('hardware');
})
// data validation ttn doesnt validate due to lazy evaluation
client.on('message', function (topic, message) {
    ttndata = JSON.parse(message.toString()); //message will be a JSON string need to parse
    var jsonv = new Jsonvalidator(ttndata);

    if(jsonv.checkValidttndata()){
        //PLAYER
        dataObject.Player.username = "TEST"; //this needs to come from db, I still can't work further on this
        dataObject.Player.action = ttndata.action;
        dataObject.Player.movement = ttndata.movement;
        dataObject.Player.dev_id = ttndata.dev_id;
        
        //CONTROLLER
        dataObject.Controller.id = ttndata.id;
    
        dataObject.Controller.addons[0] = ttndata.add_1;
        dataObject.Controller.addons[1]= ttndata.add_2;
        dataObject.Controller.addons[2] = ttndata.add_3;
        dataObject.Controller.dev_id = ttndata.dev_id;

        client.publish('game', JSON.stringify(dataObject));
        console.log("Publisher: " + JSON.stringify(dataObject));
    
    }
})
