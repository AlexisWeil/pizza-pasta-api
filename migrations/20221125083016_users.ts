import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.enum('role', ['TABLE', 'CUISINE', 'SERVEUR']).notNullable().defaultTo('TABLE');
    table.integer('serveur_fk').unsigned();

    table.foreign('serveur_fk', 'users.id');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', (table) => {
    table.dropForeign('serveur_fk');
    table.dropColumn('serveur_fk');
    table.dropColumn('role');
  });
}

