var mqtt = require('mqtt');
var validator = require('bug-jsonv')
var client  = mqtt.connect('mqtt://' + process.env.BROKER_HOST);
let http = require('./fetch');

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

//This will subscribe the client on TTN and publish the right JSON object to game server!
client.on('connect', function () {
        client.subscribe('TTN');
        client.subscribe('hardware');
})

// setInterval(async() => { //setInterval needs to go and this async function needs to be implemented in client.on('message')
//     const data = await http();
//     console.log(data.id);
// }, 1000)

// data validation ttn doesnt validate due to lazy evaluation
client.on('message', (topic, message) => {
    var ttndata = JSON.parse(message.toString()); //message will be a JSON string need to parse
    var jsonv = new validator(ttndata);

    async() => { //setInterval needs to go and this async function needs to be implemented in client.on('message')
        const data = await http();
        console.log(data);
    }

    if(topic == "TTN" && jsonv.checkValidttndatabutton()) {
        //PLAYER
        dataObject.Player.username = ""; //this needs to come from db, I still can't work further on this
        dataObject.Player.action = ttndata.action;
        dataObject.Player.movement = ttndata.movement;
        dataObject.Player.dev_id = ttndata.dev_id;
    }

    if(topic == "hardware" && jsonv.checkValidttndatahardware()) {
        //CONTROLLER
        dataObject.Controller.id = ttndata.id;
        dataObject.Controller.addons[0] = ttndata.add_1;
        dataObject.Controller.addons[1]= ttndata.add_2;
        dataObject.Controller.addons[2] = ttndata.add_3;
        dataObject.Controller.dev_id = ttndata.dev_id;
    }

    client.publish('game', JSON.stringify(dataObject));
    console.log("Publisher: " + JSON.stringify(dataObject));
})
