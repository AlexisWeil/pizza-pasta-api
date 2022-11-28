import { Maybe, Some } from 'monet';
import { Plat } from 'Plats/models';

export interface Commande {
  id: number,
  tableId: number,
  prete: boolean,
  plats: Array<Maybe<Plat>>
};

export const Commande = (
  id: number,
  tableId: number,
  prete: boolean,
  plats: Array<Maybe<Plat>>
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