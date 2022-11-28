import k, { Knex } from 'knex';

const initialisationKnex = () => {
  const knex = k({
    client: 'mysql2',
    connection: 'mysql2://root:root@localhost:8080/pizza-pasta'
  });

  knex.migrate.latest()
    .then(() => console.log('Migrations applied'));

  return knex;
};

const knex = initialisationKnex();

export default knex;