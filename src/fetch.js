const fetch = require("node-fetch");

/* This will be used to get the right user from the kiosk */
module.exports = async (dev_id, user_dongle_id) => {
  var url = `http://localhost:8000/api/session/${dev_id}/${user_dongle_id}`;
  const response = await fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json"
    }
  });

  const json = await response.json();
  return json;
};

/* Addons door sturen naar kiosk */
