import k, { Knex } from 'knex';

const initialisationKnex = () => {
  const knex = k({
    client: 'mysql',
    connection: 'mysql://etienneP:blue@127.0.0.1:3306/pizza-pasta'
  });

  knex.migrate.latest()
    .then(() => console.log('Migrations applied'));

  return knex;
};

const knex = initialisationKnex();

export default knex;