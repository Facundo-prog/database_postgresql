const { config } = require("../config/config");
const URI = config.databaseUrl;

module.exports = {
    development: {
        url: URI,
        dialect: "postgres"
    },
    production: {
        url: URI,
        dialect: "postgres"
    }
}
