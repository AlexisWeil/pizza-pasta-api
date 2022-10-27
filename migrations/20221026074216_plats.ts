import { Knex } from 'knex';
import { PlatInsert } from '../src/Plats/models';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('plats', (table) => {
    table.increments('id').primary();
    table.integer('categorie_fk').unsigned().notNullable();
    table.string('nom', 50).notNullable();
    table.float('prix').notNullable();
    table.text('ingredients');

    table.foreign('categorie_fk', 'categories.id');
  }).then(() =>
    knex.insert([
      PlatInsert(1, 'Quatre fromages', 12, 'Du fromage'),
      PlatInsert(1, 'Orientale', 13, 'Du chorizo et de la merguez'),
      PlatInsert(2, 'Pâtes pesto', 8, 'Du pesto')
    ]).into('plats')
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('plats');
}

