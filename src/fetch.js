const fetch = require('node-fetch');
const ids = require('./client');

var url = 'http://localhost:8000/api/'+ ids.dev_id + '/' + ids.user_dongle_id; 

/* This will be used to get the right user from the kiosk */
module.exports = async() => {
   const response = await fetch(url, { 
      method: "GET",
      credentials: "same-origin",
      headers: {
         "Content-type": "application/json",
      },
   }); 
   // response.catch(function(error){
   //    console.log(error);
   // })
   const json = await response.json();
   return json;
}


