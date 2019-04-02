const fetch = require('node-fetch');

/* This will be used to get the right user from the kiosk */
 /* How to get a user with given ID */
module.exports = async() => {
   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1'); //test url
   const json = await response.json();
   return json;
}
