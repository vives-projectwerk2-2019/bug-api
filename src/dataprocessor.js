var validator = require("bug-jsonv");
let http = require("./fetch");
var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://" + process.env.BROKER_HOST);
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

var kioskobj = {
  dongle_id_1: null,
  dongle_id_2: null,
  dongle_id_3: null
};
class Data {
  constructor() {}

  populateKioskObject(data) {
    kioskobj.dongle_id_1 = data.Controller.addons[0];
    kioskobj.dongle_id_2 = data.Controller.addons[1];
    kioskobj.dongle_id_3 = data.Controller.addons[2];
    http.httpaddons(kioskobj, data.Controller.id); //sending addons to kiosk
  }

  checkAndProcess(data, topic, httpdata) {
    var jsonv = new validator(data);
    if (topic == "ttn" && jsonv.checkValidttndatabutton()) {
      client.publish("logger", JSON.stringify(data));
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
    this.populateKioskObject(dataObject);
    return dataObject;
  }
}

module.exports = Data;
