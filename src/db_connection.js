var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "api",
  password: "api"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM bug", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });
 
  