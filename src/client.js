var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://" + process.env.BROKER_HOST);
let http = require("./fetch");
const processdata = require("./dataprocessor");

//This will subscribe the client on ttn and publish the right JSON object to game server!
client.on("connect", function() {
  client.subscribe("ttn");
  client.subscribe("hardware");
});

client.on("message", async (topic, message) => {
  var ttndata = JSON.parse(message.toString()); //parsing

  var p = new processdata();
  var httpdata = await http.httpids(ttndata.dev_id, ttndata.id); //fetching data

  if (topic == "ttn") {
    client.publish("logger", JSON.stringify(ttndata));
  }

  var dataobj = p.checkAndProcess(ttndata, topic, httpdata);

  client.publish("game", JSON.stringify(dataobj));
  console.log("Publisher: " + JSON.stringify(dataobj));
});
