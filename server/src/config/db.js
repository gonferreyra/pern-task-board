import { Sequelize } from 'sequelize';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '../constants/env.js';

const host = DB_HOST;
const user = DB_USER;
const database = DB_NAME;
const password = DB_PASSWORD;
const port = DB_PORT;

const DB = new Sequelize(database, user, password, {
  host: host,
  dialect: 'postgres',
  // show SQL commands on console
  logging: true,
});

export default DB;
