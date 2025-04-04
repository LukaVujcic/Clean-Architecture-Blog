import { Sequelize, Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

let config: Options;

if (isTest) {
  // Use SQLite for testing (in-memory database)
  config = {
    dialect: 'sqlite',
    storage: process.env.DB_STORAGE || ':memory:',
    logging: process.env.DB_LOGGING === 'true' ? console.log : false
  };
} else {
  // Use PostgreSQL for development and production
  config = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    logging: !isProduction ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
}

const sequelize = new Sequelize(
  process.env.DB_NAME || 'blog',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  config
);

export default sequelize;
