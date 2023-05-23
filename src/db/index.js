import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import dbConfig from '../configs/database';
import User from './models/user';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = { ...dbConfig[env] };

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const db = {
  User: User.init(sequelize),
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
