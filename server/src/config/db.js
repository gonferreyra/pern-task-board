import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../constants/env.js';

const host = DB_HOST;
const user = DB_USER;
const database = DB_NAME;
const password = DB_PASSWORD;

export const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'postgres',
  // show SQL commands on console
  logging: false,
});

// DB connection
async function dbConnection() {
  try {
    await sequelize.sync();
  } catch (error) {
    throw new Error(`Error connecting to DB: ${error.message}`);
  }
}

export default dbConnection;
