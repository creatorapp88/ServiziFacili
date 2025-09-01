const { Sequelize } = require("sequelize");
require("dotenv").config();
const path = require("path");

const dbUrl = process.env.DATABASE_URL || "";
let sequelize;
if (dbUrl) {
  // Postgres (o altro DB remoto) se DATABASE_URL è presente
  sequelize = new Sequelize(dbUrl, { dialect: "postgres", protocol: "postgres", logging: false });
} else {
  // default: file sqlite nella stessa cartella (configurabile via DB_FILE)
  const storage = process.env.DB_FILE || path.join(__dirname, "database.sqlite");
  console.log("Using SQLite storage:", storage);
  sequelize = new Sequelize({ dialect: "sqlite", storage, logging: false });
}

module.exports = sequelize;
