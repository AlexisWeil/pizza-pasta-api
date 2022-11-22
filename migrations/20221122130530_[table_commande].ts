import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return  knex.schema.createTable('commande', table => {
        table.increments('id').primary;
        table.string('id_table');
        table.string('Plats');
        table.boolean('prete').defaultTo(false);

    })
}


export async function down(knex: Knex): Promise<void> {
}

