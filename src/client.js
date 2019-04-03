var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://' + process.env.BROKER_HOST);
let http = require('./fetch');
const processdata = require('./dataprocessor')

//This will subscribe the client on TTN and publish the right JSON object to game server!
client.on('connect', function () {
        client.subscribe('TTN');
        client.subscribe('hardware');
})

client.on('message', async (topic, message) => {
    var ttndata = JSON.parse(message.toString()); //parsing
    var httpdata = await http(); //fetching data
    //console.log(await httpdata);

    var p = new processdata(ttndata, topic, httpdata);
    var dataobj = p.checkAndProcess();
   
    client.publish('game', JSON.stringify(dataobj));
    console.log("Publisher: " + JSON.stringify(dataobj));
})
