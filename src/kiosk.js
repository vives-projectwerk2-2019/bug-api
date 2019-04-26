let http = require("./fetch");

class Kiosk {
  constructor(client) {
    this.client = client;
  }
  log(controldata) {
    this.client.publish("logger", JSON.stringify(controldata));
  }
  async getplayer(dev_id, user_id) {
    return await http.httpids(dev_id, user_id);
  }

  sendDongleIds(dongles, user_id) {
    http.httpaddons(dongles, user_id);
  }
}

module.exports = Kiosk;
