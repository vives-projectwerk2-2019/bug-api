var Validator = require('jsonschema').Validator;
var v = new Validator();

class Jsonvalidator{
    constructor(data){
        this.data = data;
    };
/* TEMPORARY FIX FOR VALIDATING BOTH OBJECTS, THIS WILL GIVE ERRORS IN CONSOLE THAT YOU CAN IGNORE */ 
    checkValidttndata(){
        var ttndata = this.data;
        var hardwaredata = v.validate(ttndata, schemaNewhardware);
        var buttondata = v.validate(ttndata, schemaButton);

        if(hardwaredata.valid && buttondata.valid){
            return true;
        }else {
            console.log("Errors for schemaHardware: " + hardwaredata.errors + "\n" 
            + "Errors for schemaButton: " + buttondata.errors);
            return false;
        }
    }

    checkValidclientdata(){ //THIS WILL BE USED IN GROUP GAME
        var clientdata = this.data;
        if(!v.validate(clientdata, schemaObject).valid){
            console.log("Errors for clientdata: " + v.validate(clientdata, schemaObject).errors); 
            return false;
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
        "movements": {"type": "string"},
        "action":  {"type": "string"},
        "dev_id":  {"type": "string"}
    },
    "required": ["dev_id"]
};

var schemaNewhardware = {
    "id" : "/schemaNewhardware",
    "type" : "object",
    "properties" : {
        "id" : {"type" : "integer"},
        "add_1" : {"type" : "integer"},
        "add_2" : {"type" : "integer"},
        "add_3" : {"type" : "integer"},
        "dev_id": {"type" : "string"}
    },
    "required": ["id", "add_1" , "add_2" , "add_3"]
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


