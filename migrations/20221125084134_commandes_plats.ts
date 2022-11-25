import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('commandes_plats', (table) => {
    table.increments('id').primary();
    table.integer('commande_fk').unsigned();
    table.integer('plat_fk').unsigned();

    table.foreign('commande_fk', 'commandes.id');
    table.foreign('plat_fk', 'plats.id');
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('commandes_plats');
}

