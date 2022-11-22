import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.raw('ALTER TABLE users ADD id_role int(10)').then(() => {
       return  knex.schema.raw('ALTER TABLE users ADD web_socket varchar(255)').then(() => {
           return knex.schema.raw('ALTER TABLE users ADD id_serveur int(8)')
        }).then(() => {
           
           return  knex.schema.createTable('role', table => {
                table.increments('id').primary;
                table.string('nom');
            })
        }).then(() => {
            return knex.insert([
                ({nom:'Serveur'}),
                ({nom:'Cuisine'}),
                ({nom:'Table'})
              ]).into('role')
        })
    })
}


export async function down(knex: Knex): Promise<void> {
}

