import insertCommande, { InsertCommande } from './daos/insertCommande';
import { Commande, CommandeInsert } from 'Commandes/models';
import retrievePlatById, { RetrievePlatById } from 'Plats/daos/retrievePlatById';
import { Plat } from 'Plats/models';
import { Exception } from 'global/api';
import retrieveCommandeById, { RetrieveCommandeById } from 'Commandes/daos/retrieveCommandeById';
import updateCommandeStatut, { UpdateCommandeStatut } from 'Commandes/daos/updateCommandeStatut';
import eventManager, { CommandePrete, NouvelleCommande } from 'Events';
import { Either, Left, Maybe, Right } from 'monet';
import * as _ from 'lodash';

export class CommandesService {
  private readonly insertCommande: InsertCommande;
  private readonly retrievePlatById: RetrievePlatById;
  private readonly retrieveCommandeById: RetrieveCommandeById;
  private readonly updateCommandeStatut: UpdateCommandeStatut;

  constructor(
    insertCommande: InsertCommande,
    retrievePlatById: RetrievePlatById,
    retrieveCommandeById: RetrieveCommandeById,
    updateCommandeStatut: UpdateCommandeStatut
  ) {
    this.insertCommande = insertCommande;
    this.retrievePlatById = retrievePlatById;
    this.retrieveCommandeById = retrieveCommandeById;
    this.updateCommandeStatut = updateCommandeStatut;
  }

  createCommande = (commande: CommandeInsert): Promise<Either<Array<Exception>, Commande>> =>
    Promise.all(
      commande.plats.map((platId) =>
        this.retrievePlatById(platId)
      )
    ).then((plats: Array<Either<Exception, Maybe<Plat>>>) =>
      this.buildCommande(
        commande,
        Maybe.fromNull(_.head(plats)),
        _.tail(plats),
        [],
        []
      )
    );

  buildCommande = (
    commande: CommandeInsert,
    mPlat: Maybe<Either<Exception, Maybe<Plat>>>,
    restPlats: Array<Either<Exception, Maybe<Plat>>>,
    exceptions: Exception[],
    plats: Array<Plat>
  ): Promise<Either<Exception[], Commande>> =>
    mPlat.cata(
      () => {
        if (exceptions.length > 0)
          return Promise.resolve(Left(exceptions));

        const unknownPlats =
          commande.plats.filter((platId) =>
            plats.find((plat) =>
              plat.id === platId
            ) === undefined
          );

        if (unknownPlats.length > 0)
          return Promise.resolve(Left([Exception('plats', 'Plats inconnus : ' + unknownPlats)]));

        return this.insertCommande(commande)
          .then((id) => Right({
            id,
            tableId: commande.tableId,
            prete: false,
            plats: plats
          }));
      },
      (ePlat: Either<Exception, Maybe<Plat>>) =>
        ePlat.cata(
          (e) =>
            this.buildCommande(commande, Maybe.fromNull(_.head(restPlats)), _.tail(restPlats), exceptions.concat([e]), plats),
          (mPlat) =>
            this.buildCommande(commande, Maybe.fromNull(_.head(restPlats)), _.tail(restPlats), exceptions,
              mPlat.cata(
                () => plats,
                (p) => plats.concat([p])
              )
            )
        )
    );

  getCommandeById = (commandeId: number): Promise<Commande | undefined> =>
    this.retrieveCommandeById(commandeId);

  modifyCommandeStatut = (commandeId: number, statut: boolean): Promise<void> =>
    this.updateCommandeStatut(commandeId, statut)
      .then(() =>
        this.getCommandeById(commandeId)
      )
      .then((commande) => {
        if (statut && commande) {
          eventManager.broadcast<CommandePrete>({
            key: 'COMMANDE_' + commande.tableId + '_PRETE',
            data: {
              commandeId,
              tableId: commande.tableId
            }
          });
        }
      });
};

const commandeService =
  new CommandesService(
    insertCommande,
    retrievePlatById,
    retrieveCommandeById,
    updateCommandeStatut
  );

export default commandeService;