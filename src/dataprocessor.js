var validator = require('bug-jsonv');
/* The actual data object that needs to be validated before sending to game */
var dataObject = {
    Player: {
        username: null,
        movement: null,
        dev_id: null,
        action: null,
        joined: true
    },
    Controller: {
        id: null,
        addons: [null, null, null],
        dev_id: null
    }
};
class Data {
    constructor() {
    };

    checkAndProcess(data, topic, httpdata) {
        var jsonv = new validator(data);
        //var userData = checkhttpdata();

        if (topic == "ttn" && jsonv.checkValidttndatabutton()) {
            dataObject.Player.username = httpdata.name;
            dataObject.Player.action = data.action;
            dataObject.Player.movement = data.movement;
            dataObject.Player.dev_id = data.dev_id;
        }
        if (topic == "hardware" && jsonv.checkValidttndatahardware()) {
            //CONTROLLER
            dataObject.Controller.id = data.id;
            dataObject.Controller.addons[0] = data.add_1;
            dataObject.Controller.addons[1] = data.add_2;
            dataObject.Controller.addons[2] = data.add_3;
            dataObject.Controller.dev_id = data.dev_id;
        }
        return dataObject;
    }
};

module.exports = Data;

