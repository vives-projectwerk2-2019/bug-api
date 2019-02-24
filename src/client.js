var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://' + process.env.BROKER_HOST); //ip van de server?
var ttndata = "";

//JSON string voor input events example static
var dataObject = {
    Player: {
        username: "",
        dev_id: null, 
        button: null, // don't know what this will be yet
        joined: true
    },
    Controller: {
        id: 0,
        addons: {
            add_1: 0,
            add_2: 0,
            add_3: 0
        }, 
        dev_id: ""
    }
};
//This will subscribe the client on TTN and publish the right JSON object to game server!

client.on('connect', function () {
        client.subscribe('TTN');
})

client.on('message', function (topic, message) {
    //TODO:how will the format be? How to process information?
    ttndata = JSON.parse(message.toString()); //message will be a JSON string need to parse, format will be {button:2, dev_id: 3} THIS will only cover ttndata

    //PLAYER
    dataObject.Player.username = ""; //this needs to come from db
    dataObject.Player.button = ttndata.button;
    dataObject.Player.dev_id = ttndata.dev_id;

    //CONTROLLER
    dataObject.Controller.id = ttndata.id;
    dataObject.Controller.addons.add_1 = ttndata.add_1;
    dataObject.Controller.addons.add_2 = ttndata.add_2;
    dataObject.Controller.addons.add_3 = ttndata.add_3;
    dataObject.Controller.dev_id = ttndata.dev_id;
    
    client.publish('game', JSON.stringify(dataObject));
    console.log("Publisher: " + JSON.stringify(dataObject));
})
