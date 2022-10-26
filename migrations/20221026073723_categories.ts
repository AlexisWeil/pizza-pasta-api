import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('nom', 30).notNullable().unique();
  }).then(() =>
    knex.insert([{ nom: 'Pizza' }, { nom: 'Pasta' }])
      .into('categories')
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('categories');
}

