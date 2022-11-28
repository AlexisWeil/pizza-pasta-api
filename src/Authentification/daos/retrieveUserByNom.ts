import { User } from 'Authentification/models';
import knex from 'global/knex';
import { Maybe, None, Some } from 'monet';

export type RetrieveUserByNom = (nom: string) => Promise<Maybe<User>>;

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
        return None();

      const u = rows[0];

      return Some(User(
        u.id,
        u.nom,
        u.motDePasse,
        u.role,
        u.serveurId,
        rows.map((row) => row['tableId'])
      ));
    });

export default retrieveUserByNom;