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
    constructor(data, topic, httpdata) {
        this.data = data;
        this.topic = topic;
        this.httpdata = httpdata;
    };

    checkAndProcess() {
        var jsonv = new validator(this.data);

        if (this.topic == "TTN" && jsonv.checkValidttndatabutton()) {
            dataObject.Player.username = this.httpdata.title;
            dataObject.Player.action = this.data.action;
            dataObject.Player.movement = this.data.movement;
            dataObject.Player.dev_id = this.data.dev_id;
        }
        if (this.topic == "hardware" && jsonv.checkValidttndatahardware()) {
            //CONTROLLER
            dataObject.Controller.id = this.data.id;
            dataObject.Controller.addons[0] = this.data.add_1;
            dataObject.Controller.addons[1] = this.data.add_2;
            dataObject.Controller.addons[2] = this.data.add_3;
            dataObject.Controller.dev_id = this.data.dev_id;
        }
        return dataObject;
    }

};

module.exports = Data;

