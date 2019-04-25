const fetch = require("node-fetch");

/* This will be used to get the right user from the kiosk */
const httpids = async (dev_id, user_dongle_id) => {
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
const httpaddons = async (data, user_dongle_id) => {

  var url = `http://localhost:8000//api/activate_dongle/${user_dongle_id}`;
  try {
    await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports.httpids = httpids;
module.exports.httpaddons = httpaddons;
