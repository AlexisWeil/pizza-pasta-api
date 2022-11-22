import { User } from 'Authentification/models';
import knex from 'global/knex';

export type RetrieveUserByNom = (nom: string) => Promise<User | undefined>;

const retrieveUserByNom: RetrieveUserByNom = (nom: string) =>
  knex.select(
    knex.ref('id'),
    knex.ref('nom'),
    knex.ref('mot_de_passe').as('motDePasse'),
    knex.ref('role')
  ).from<User>('users')
    .where({ nom: nom })
    .first();

export default retrieveUserByNom;