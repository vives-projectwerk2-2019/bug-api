class Game {
  constructor(client) {
    this.client = client;
  }
  publishPlayerAction(controller, movement, actions) {
    var dataObject = {
      Player: {
        username: controller.playerName,
        movement: movement,
        dev_id: controller.dev_id,
        action: actions
      },
      Controller: {
        id: controller.uid,
        addons: controller.addons,
        dev_id: controller.dev_id
      }
    };

    this.client.publish("game3", JSON.stringify(dataObject));
    console.log("Publisher: " + JSON.stringify(dataObject));
  }
}
module.exports = Game;
