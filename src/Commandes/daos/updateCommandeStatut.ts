import knex from "global/knex";
import { Exception } from 'global/api';

export type UpdateCommandeStatut = (commandeId: number, statut: boolean) => Promise<void>;

const updateCommandeStatut: UpdateCommandeStatut = (commandeId, statut) =>
  knex.update({ prete: statut })
    .from('commandes')
    .where({ id: commandeId })
    .then((nbUpdated) => {
      if (nbUpdated <= 0)
        throw Exception('commandeId', 'Commande inconnue')
    });

export default updateCommandeStatut;
