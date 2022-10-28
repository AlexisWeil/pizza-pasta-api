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

export const platToInsert = (plat: Plat) =>
  PlatInsert(
    plat.categorieId,
    plat.nom,
    plat.prix,
    plat.ingredients
  );

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

export type PlatListWithCategorie = PlatList & { categorie: string };

export const PlatListWithCategorie = (
  id: number,
  categorie: string,
  nom: string,
  prix: number
): PlatListWithCategorie => ({
  id,
  categorie,
  nom,
  prix
});