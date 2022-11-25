import { User } from 'Authentification/models';
import knex from 'global/knex';

export type RetrieveUserByNom = (nom: string) => Promise<User | undefined>;

const retrieveUserByNom: RetrieveUserByNom = (nom: string) =>
  knex.select(
    knex.ref('U.id'),
    knex.ref('U.nom'),
    knex.ref('U.mot_de_passe').as('motDePasse'),
    knex.ref('U.role').as('role'),
    knex.ref('U.serveur_fk').as('serveurId'),
    knex.ref('T.id').as('tableId')
  ).from<User>('users as U')
    .leftJoin('users as T', 'U.id', 'T.serveur_fk')
    .where({ 'U.nom': nom })
    .then((rows) => {
      if (rows.length <= 0)
        return undefined;

      const u = rows[0];

      return User(
        u.id,
        u.nom,
        u.motDePasse,
        u.role,
        u.serveurId,
        rows.map((row) => row['tableId'])
      );
    });

export default retrieveUserByNom;