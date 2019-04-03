const fetch = require('node-fetch');
const devid = require('./client');

var url = 'https://jsonplaceholder.typicode.com/todos/1'; //needs url from API endpoint

/* This will be used to get the right user from the kiosk */
module.exports = async() => {
   const response = await fetch(url, { 
      method: "POST",
      credentials: "same-origin",
      headers: {
         "Content-type": "application/json",
      },
      body: JSON.stringify(devid), //needs to get dev_id

   }); 
   const json = await response.json();
   return json;
}
