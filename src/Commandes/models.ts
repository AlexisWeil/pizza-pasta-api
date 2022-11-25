import { Plat } from 'Plats/models';

export interface Commande {
  id: number,
  tableId: number,
  prete: boolean,
  plats: Array<Plat>
};

export const Commande = (
  id: number,
  tableId: number,
  prete: boolean,
  plats: Array<Plat>
): Commande => ({
  id,
  tableId,
  prete,
  plats
});

export interface CommandeInsert {
  tableId: number,
  plats: Array<number>
};