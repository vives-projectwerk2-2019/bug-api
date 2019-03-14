//var http = require('http');

var urldata = {
   host: 'http://localhost:8000/api/user', // need an API token
   path: '/acsearch',
   method: 'GET'
}
/* THIS WILL SEND A HUGE STRING */

// function OnResponse(response) { 
//  var data = ''; 
//    response.on('data', function(chunk) { 
//         data += chunk; 
//    });

//     response.on('end', function() {
//         console.log(data);
//     });
//    }

//    fetch(urldata)

//  http.request(urldata, OnResponse).end();

 /* How to get a user with given ID */
fetch('http://localhost:8000/api/user')
  .then(response => response.json())
  .then(data => console.log(data))

  /* Get All users */
fetch('http://localhost:8000/api/user')
   .then(response => response.json())
   .then(data => console.log(data))