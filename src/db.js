module.exports = {
    initialize: function(next){
      this.initializeDB(next);
    },
    initializeDB: function(next){
        const mariadb = require('mariadb')
        module.exports.pool = mariadb.createPool({
            host: 'db', 
            user:'api', 
            password: 'api',
            database: 'bug',
            connectionLimit: 5
        });
        next();
    }
}
