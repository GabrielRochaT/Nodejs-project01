const Sequelize = require('sequelize');
require('dotenv').config();

const {DB_NAME, DB_PSWD} = process.env;

const conn = new Sequelize(DB_NAME, 'root', DB_PSWD,{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = conn