import knex from 'knex';
import { getNamespace } from 'continuation-local-storage';

import knexConfig from './config/knex.config';

let connectionMap: any;

export async function connectAllDB() {
  let tenants;
  try {
    tenants = await knexConfig().select('*').from('tenants');
  } catch (error) {
    throw error;
  }
  connectionMap = tenants
    .map((tenant) => {
      return {
        [tenant.slug]: knex(createConnectionConfig(tenant))
      };
    })
    .reduce((prev, next) => {
      return Object.assign({}, prev, next);
    }, {});
}

function createConnectionConfig(tenant: any) {
  return {
    client: 'pg',
    connection: {
      host: tenant.db_host,
      port: tenant.db_port,
      user: tenant.db_username,
      database: tenant.db_name,
      password: tenant.db_password
    }
  };
}

export function getConnectionBySlug(slug: any) {
  if (connectionMap) {
    return connectionMap[slug];
  }
}

export function getConnection() {
  const nameSpace = getNamespace('tenant_context');
  const conn = nameSpace.get('connection');
  return conn;
}
