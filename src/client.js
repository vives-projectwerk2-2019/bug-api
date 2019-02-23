var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://labict.be'); //ip van de server?
var ttndata = "";

//JSON string voor input events example static
var dataObject = {
    Player: {
        username: "",
        id: 1, 
        button: "", // don't know what this will be yet
        joined: true
    },
    Controller: {
        id: null,
        addons: ["rocket", "speedboost", "anotherthing"]
    }
};
var myDataObj = JSON.stringify(dataObject); // ready to be send as JSON 

//This will subscribe the client on TTN and publish the right JSON object to game server!

client.on('connect', function () {
    setInterval(() => {
        client.subscribe('TTN', function(err){ //subscribe op TTN
            if(!err){
                client.publish('game', myDataObj);
                console.log("Publisher: " + myDataObj);
            }
        }) 
    }, 1000);
})

client.on('message', function (topic, message) {
    //TODO:how will the format be? How to process information?
    ttndata = message.toString(); //message will be a JSON string need to parse, format will be {button:2, dev_id: 3}
    dataObject.Player.username = "Jelle";
    console.log("Subscriber: Button: " + ttndata);
})
