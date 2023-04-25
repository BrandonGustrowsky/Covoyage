import { Options } from '@mikro-orm/core';
import * as dotenv from "dotenv"

dotenv.config({
    path: `./${process.env.NODE_ENV}.env`
}) // Sets up dotenv to pul from our enviornment file

const config = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  // dbName: "final-project",
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  type: 'mysql',
  port: +(process.env.DB_PORT as string) || 3308,
  debug: true,
} as Options;

export default config;