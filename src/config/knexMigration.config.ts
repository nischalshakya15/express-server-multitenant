import { config } from './config';

export const knexMigrationConfig = {
  ...config.database,
  migrations: {
    tableName: 'migrations_expresss_multitenant',
    directory: '../migrations',
    extensions: ['ts']
  },
  seeds: {
    directory: '../seeds'
  }
};

module.exports = knexMigrationConfig;
