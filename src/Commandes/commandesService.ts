import insertCommande, { InsertCommande } from './daos/insertCommande';
import { Commande, CommandeInsert } from 'Commandes/models';
import retrievePlatById, { RetrievePlatById } from 'Plats/daos/retrievePlatById';
import { Plat } from 'Plats/models';
import { Exception } from 'global/api';
import retrieveCommandeById, { RetrieveCommandeById } from 'Commandes/daos/retrieveCommandeById';
import updateCommandeStatut, { UpdateCommandeStatut } from 'Commandes/daos/updateCommandeStatut';
import eventManager, { CommandePrete, NouvelleCommande } from 'Events';
import { Maybe, None, Some } from 'monet';

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

  createCommande = (commande: CommandeInsert): Promise<Commande> =>
    Promise.all(
      commande.plats.map((platId) =>
        this.retrievePlatById(platId)
      )
    ).then((plats: Array<Maybe<Plat>>) => {
      const unknownPlats =
        commande.plats.filter((platId) =>
          plats.find((plat) =>
            plat.cata(
              () => false,
              () => true
            )
          )
        );

      if (unknownPlats.length > 0)
        throw Exception('plats', 'Plats inconnus : ' + unknownPlats);

      return plats
    })
      .then((plats: Array<Maybe<Plat>>) =>
        this.insertCommande(commande)
          .then((id) => ({
            id,
            tableId: commande.tableId,
            prete: false,
            plats: plats
          }))
      )
      .then((commande: Commande) => {
        eventManager.broadcast<NouvelleCommande>({
          key: 'NOUVELLE_COMMANDE',
          data: {
            commandeId: commande.id
          }
        });

        return commande;
      });

  getCommandeById = (commandeId: number): Promise<Maybe<Commande>> =>
    this.retrieveCommandeById(commandeId);

  modifyCommandeStatut = (commandeId: number, statut: boolean): Promise<void> =>
    this.updateCommandeStatut(commandeId, statut)
      .then(() =>
        this.getCommandeById(commandeId)
      )
      .then((commande) => {
        commande.cata(
          () => None(),
          (comm) => Some(eventManager.broadcast<CommandePrete>({
                key: 'COMMANDE_' + comm.tableId + '_PRETE',
                data: {
                  commandeId,
                  tableId: comm.tableId
                }
          }))
        );
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