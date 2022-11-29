import { User } from 'Authentification/models';
import knex, { handleSQLException } from 'global/knex';
import { Either, Maybe, None, Right, Some } from 'monet';
import { Exception } from 'global/api';

export type RetrieveUserByNom = (nom: string) => Promise<Either<Exception, Maybe<User>>>;

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
        return Right<Exception, Maybe<User>>(None());

      const u = rows[0];

      return Right<Exception, Maybe<User>>(
        Some(
          User(
            u.id,
            u.nom,
            u.motDePasse,
            u.role,
            u.serveurId,
            rows.map((row) => row['tableId'])
          )
        )
      );
    })
    .catch(handleSQLException('user-retrieve'));

export default retrieveUserByNom;