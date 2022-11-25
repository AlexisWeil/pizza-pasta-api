import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('commandes', (table) => {
    table.increments('id').primary();
    table.integer('table_fk').unsigned();
    table.boolean('prete').defaultTo(false);

    table.foreign('table_fk', 'users.id');
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('commandes');
}

