const mosca = require('mosca')

var moscaSettings = {
    port: 1883
};

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

function setup() {
    console.log('Mosca broker is up and running')
}
