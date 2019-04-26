
class Controller {
  constructor(playerdata, controllerdata) {
    this.uid = controllerdata.id;
    this.dev_id = controllerdata.dev_id;
    this.playerName = playerdata.name;
    this.addons = [
      controllerdata.add_1,
      controllerdata.add_2,
      controllerdata.add_3
    ];
  }

  getDongles() {
    return {
      dongle_id_1: this.addons[0],
      dongle_id_2: this.addons[1],
      dongle_id_3: this.addons[2]
    };
  }
}

module.exports = Controller;
