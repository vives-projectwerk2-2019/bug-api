/*./src/http.js requiren om daarna functies aan te roepen voor deze file */
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://' + process.env.BROKER_HOST); //ip van de server?
var ttndata = "";
var http = require('./http_request');

/* Validating JSON objects section, I'll be working with split schemas and references. */
var Validator = require('jsonschema').Validator;
var v = new Validator();

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

v.addSchema(jsonschemaPlayer, '/SchemaPlayer');
v.addSchema(jsonschemaController, '/SchemaController');

/* End of validating JSON objects with schema */

//This will subscribe the client on TTN and publish the right JSON object to game server!
client.on('connect', function () {
        client.subscribe('TTN');
})

client.on('message', function (topic, message) {
    ttndata = JSON.parse(message.toString()); //message will be a JSON string need to parse

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

    //VALIDATION WITH SCHEMA AND SEND
    if(v.validate(dataObject, schemaObject).valid)
    {
        client.publish('game', JSON.stringify(dataObject));
        console.log(v.validate(dataObject, schemaObject));
        console.log("Publisher: " + JSON.stringify(dataObject));
    } else {
        console.log("The object isn't valid!!")
    }
})
