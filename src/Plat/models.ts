export interface Plat {
  id: number,
  categorieId: number,
  nom: string,
  prix: number,
  ingredients: string
}

export const Plat = (
  id: number,
  categorieId: number,
  nom: string,
  prix: number,
  ingredients: string
): Plat => ({
  id,
  categorieId,
  nom,
  prix,
  ingredients
});

export const PlatInsert = (
  categorieId: number,
  nom: string,
  prix: number,
  ingredients: string
) => ({
  categorie_fk: categorieId,
  nom,
  prix,
  ingredients
});

export interface PlatList {
  id: number,
  nom: string,
  prix: number
}

export const PlatList = (
  id: number,
  nom: string,
  prix: number
): PlatList => ({
  id,
  nom,
  prix
});

export const platToPlatList = (plat: Plat): PlatList =>
  PlatList(plat.id, plat.nom, plat.prix);