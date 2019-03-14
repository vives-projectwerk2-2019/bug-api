var http = require('http');
var urldata = {
   host: 'http://localhost:8000/api/user',
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

   fetch(urldata)

 http.request(urldata, OnResponse).end();