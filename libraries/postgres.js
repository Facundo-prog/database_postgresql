const { Client } = require("pg");
const { config } = require("../config/config");
const URI = config.databaseUrl;

async function getConnection(){
    const client = new Client({ connectionString: URI });

    await client.connect();
    return client;
}

module.exports = getConnection;
