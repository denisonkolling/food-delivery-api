import { Options, PostgreSqlDriver } from '@mikro-orm/postgresql';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const mikroOrmConfig: Options = {
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  driver: PostgreSqlDriver,
  dbName: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
};

export default mikroOrmConfig;
