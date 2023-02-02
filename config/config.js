require("dotenv").config();

const config = {
    env: process.env.NODE_ENV || "dev",
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL
}

module.exports = { config }
