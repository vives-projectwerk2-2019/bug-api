var http = require('http');
var urldata = {
   host: 'http://kiosk/users',
   path: '/acsearch',
   method: 'GET'
}

function OnResponse(response) { 
 var data = ''; 
   response.on('data', function(chunk) { 
        data += chunk; 
   });

    response.on('end', function() {
        console.log(data);
    });
 }

 http.request(urldata, OnResponse).end();