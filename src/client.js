/*./src/http.js requiren om daarna functies aan te roepen voor deze file */
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://' + process.env.BROKER_HOST); //ip van de server?
var ttndata = "";
//var http = require('./http_request');

var Jsonvalidator = require('./jsonvalidator');

var lastButton;
var lastHardware;

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
        id: null,
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

    let type = undefined;

    if(jsonv.checkValidttndatabutton()) {
        type = "button"; //needs a fetch API for later, connecting to kiosk
        lastButton = ttndata;
    }

    if(jsonv.checkValidttndatahardware()) {
        type = "hardware";
        lastHardware = ttndata;
    }

    if(type !== undefined){
        //PLAYER
        dataObject.Player.username = ""; //this needs to come from db, I still can't work further on this
        dataObject.Player.action = lastButton.action;
        dataObject.Player.movement = lastButton.movement;
        dataObject.Player.dev_id = lastButton.dev_id;

        //CONTROLLER
        dataObject.Controller.id = lastHardware.id;
    
        dataObject.Controller.addons[0] = lastHardware.add_1;
        dataObject.Controller.addons[1]= lastHardware.add_2;
        dataObject.Controller.addons[2] = lastHardware.add_3;
        dataObject.Controller.dev_id = lastHardware.dev_id;

        client.publish('game', JSON.stringify(dataObject));
        console.log("Publisher: " + JSON.stringify(dataObject));
    }
})
