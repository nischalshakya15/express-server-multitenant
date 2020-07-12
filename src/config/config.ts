import dotenv from 'dotenv';

dotenv.config();

export const config = {
  app: {
    name: process.env.NAME || 'Server',
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0'
  },
  database: {
    client: process.env.DB_POSTGRES || 'pg',
    connection: {
      user: process.env.DB_POSTGRES_USER || 'postgres',
      password: process.env.DB_POSTGRES_PASSWORD || 'root',
      database: process.env.DB_POSTGRES_NAME || 'common_db',
      host: process.env.DB_POSTGRES_HOST || '127.0.0.1',
      port: process.env.DB_POSTGRES_PORT || 5432
    }
  }
};
