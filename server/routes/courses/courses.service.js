const config = require('dbConfig.json');
const db = require('_connection/dbConnection');

module.exports = {
    create 
}

async function create(params) {
   
    //save user
    await db.courses.create(params);
}
