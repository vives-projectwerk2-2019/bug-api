
var Validator = require('jsonschema').Validator;
var v = new Validator();

class Jsonvalidator{
    constructor(){};

    checkValid(ttndata){
        if((v.validate(ttndata, schemaNewhardware).valid) || (v.validate(ttndata, schemaButton).valid)){
            return true;
        }else{
            return false;
        }
    }
};
module.exports = Jsonvalidator
// required in json schema
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


