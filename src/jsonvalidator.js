
var Validator = require('jsonschema').Validator;
var v = new Validator();

class Jsonvalidator{
    constructor(){};

    checkValidttndata(ttndata){
        if((v.validate(ttndata, schemaNewhardware).valid) || (v.validate(ttndata, schemaButton).valid)){
            return true;
        }else{
            return false;
        }
    }

    checkValidclientdata(clientdata){ //THIS WILL BE USED IN GROUP GAME
        if(!v.validate(clientdata, schemaObject).valid){
            return "Client data is not validated";
        }else {
            return true;
        }
    }
};
module.exports = Jsonvalidator
/* Schemas for validating ttndata */
var schemaButton = {
    "id": "/schemaButton",
    "type": "object",
    "properties": {
        "movemenst": {"type": "string"},
        "action":  {"type": "string"},
        "dev_id":  {"type": "string"}
    }
};


var schemaNewhardware = {
    "id" : "/schemaNewhardware",
    "type" : "object",
    "properties" : {
        "id" : {"type" : "int"},
        "add_1" : {"type" : "int"},
        "add_2" : {"type" : "int"},
        "add_3" : {"type" : "int"},
    }
};

/* Schemas for validating client data */
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


