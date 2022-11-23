import { User } from 'Authentification/models';
import knex from 'global/knex';


export type InsertUser = (user: User) => Promise<number>;

const insertUser: InsertUser = (user: User) =>
  knex.insert({
    nom: user.nom,
    mot_de_passe: user.motDePasse,
    id_role : user.id_role,
  }).into('users')
    .returning('id')
    .then((id) => id[0]);

export default insertUser;