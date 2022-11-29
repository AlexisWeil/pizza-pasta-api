import k, { Knex } from 'knex';
import { Left } from 'monet';
import { Exception } from 'global/api';

const initialisationKnex = () => {
  const knex = k({
    client: 'mysql',
    connection: 'mysql://user:password@localhost:3306/pizza-pasta'
  });

  knex.migrate.latest()
    .then(() => console.log('Migrations applied'));

  return knex;
};

const knex = initialisationKnex();

export const handleSQLException = <T>(key: string) => (e: any) => Left<Exception, T>(Exception(key, e.message));

export default knex;