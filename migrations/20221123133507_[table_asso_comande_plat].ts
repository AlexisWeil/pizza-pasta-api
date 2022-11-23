import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return  knex.schema.createTable('commande_plats', table => {
        table.increments('id').primary;
        table.string('id_commande');
        table.string('id_plats');
    })

}


export async function down(knex: Knex): Promise<void> {
}

