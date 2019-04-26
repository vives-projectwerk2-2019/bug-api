var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://" + process.env.BROKER_HOST);

const validator = require("bug-jsonv");
var controllers = {};
const kiosk = require("./kiosk");
const game = require("./game");
const controller = require("./controller");

//This will subscribe the client on ttn and publish the right JSON object to game server!
client.on("connect", function() {
  client.subscribe("ttn");
  client.subscribe("hardware");
});

client.on("message", async (topic, message) => {
  
  var ttndata = JSON.parse(message.toString()); //parsing
  var ks = new kiosk(client);
  var gm = new game(client);
  const jsonv = new validator(ttndata);

  if (topic == "hardware" && jsonv.checkValidttndatahardware()) {
    var playerdata = await ks.getplayer(ttndata.dev_id, ttndata.id);
    controllers[ttndata.dev_id] = new controller(playerdata, ttndata);
  } else if (topic == "ttn" && jsonv.checkValidttndatabutton()) {
    var controllerdata = controllers[ttndata.dev_id];
    if (controllerdata) {
      ks.log(ttndata);
      ks.sendDongleIds(controllerdata.getDongles(), controllerdata.uid);
      gm.publishPlayerAction(controllerdata, ttndata.movement, ttndata.action);
    }
  }
});
