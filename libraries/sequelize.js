const { Sequelize } = require("sequelize");
const { config } = require("../config/config");
const setupModels = require("../db/models");
const URI = config.databaseUrl;

const sequelize = new Sequelize(URI, {
    dialect: "postgres",
    logging: true
});

setupModels(sequelize);

module.exports = sequelize;
