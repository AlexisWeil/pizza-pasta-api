import insertCommande, { InsertCommande } from './daos/insertCommande';
import { Commande, CommandeInsert } from 'Commandes/models';
import retrievePlatById, { RetrievePlatById } from 'Plats/daos/retrievePlatById';
import { Plat } from 'Plats/models';
import { Exception } from 'global/api';
import retrieveCommandeById, { RetrieveCommandeById } from 'Commandes/daos/retrieveCommandeById';
import updateCommandeStatut, { UpdateCommandeStatut } from 'Commandes/daos/updateCommandeStatut';
import eventManager, { CommandePrete, NouvelleCommande } from 'Events';

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
    ).then((plats: Array<Plat | undefined>) => {
      const unknownPlats =
        commande.plats.filter((platId) =>
          plats.find((plat) =>
            plat && plat.id === platId
          ) === undefined
        );

      if (unknownPlats.length > 0)
        throw Exception('plats', 'Plats inconnus : ' + unknownPlats);

      return plats
        .filter((p) => p !== undefined)
        .map((plat: Plat | undefined) => plat as Plat);
    })
      .then((plats: Array<Plat>) =>
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