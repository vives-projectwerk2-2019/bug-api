var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://' + process.env.BROKER_HOST); //ip van de server?
var ttndata = "";
//var http = require('http.js');

/* Validating JSON objects section, I'll be working with split schemas and references. */
var Validator = require('jsonschema').Validator;
var v = new Validator();

/* Split schema for Player */
var jsonschemaPlayer = {
    "id": "/SchemaPlayer",
    "type": "object",
    "properties": {
        "username": {"type": "string"},
        "movement": {
            "type": ["string", null]
        },
        "dev_id": {"type": "string"},
        "action": {
            "type": ["string", null]
        },
        "joined": {"type": "boolean"},
    }
};

/* Split schema for Controller */
var jsonschemaController = {
    "id": "/SchemaController",
    "type": "object",
    "properties": {
        "id": {"type": "integer"},
        "addons": {
            "type": "array",
            "items":  {
                "type": ["integer", null]
            }
        },
        "dev_id": {"type": "string"}
    }
};

/* JSON schema for JSON object 'dataObject' */
var schemaObject = {
    "id": "/SchemaObject",
    "type": "object",
    "properties": {
        "Player": {"$ref": "/SchemaPlayer"},
        "Controller": {"$ref": "/SchemaController"}
    }
};

/* End of validating JSON objects with schema */
/*./src/http.js requiren om daarna functies aan te roepen voor deze file */

//JSON string voor input events example static
var dataObject = {
    Player: {
        username: "",
        movement: null,
        dev_id: null, 
        action: null, // don't know what this will be yet
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
})

client.on('message', function (topic, message) {
    //TODO:how will the format be? How to process information?
    ttndata = JSON.parse(message.toString()); //message will be a JSON string need to parse, format will be {button:2, dev_id: 3} THIS will only cover ttndata

    //PLAYER
    dataObject.Player.username = "TEST"; //this needs to come from db
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
})
