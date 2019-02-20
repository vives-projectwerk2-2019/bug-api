var ttn = require("ttn")
var appID = process.env.APP_ID
var accessKey = process.env.ACCESS_KEY

if (appID && accessKey) {
    ttn.data(appID, accessKey)
        .then(function (client) {
            client.on("uplink", function (devID, payload) {
                console.log("Received uplink from ", devID)
                body = {
                    data: payload.payload_fields.value
                }
                console.log(JSON.stringify(body));
            })
        })
        .catch(function (error) {
            console.error("Error", error)
            process.exit(1)
        })
}
