import { Carte } from 'Carte/models';
import { Categorie } from 'Categories/models';
import { Plat, PlatList, platToPlatList } from 'Plats/models';


export const buildCarte = (
  categories: Array<Categorie>,
  plats: Array<Plat>
): Carte =>
  Object.fromEntries(
    buildCarteMap(categories, plats)
  );

type CategorieEntry = [string, Array<PlatList>];

const buildCarteMap = (
  categories: Array<Categorie>,
  plats: Array<Plat>
): Array<CategorieEntry> =>
  categories.map((categorie: Categorie) =>
    [
      categorie.nom,
      getPlatListFromCategorie(plats, categorie.id)
    ]
  );

const getPlatListFromCategorie =
  (
    plats: Array<Plat>,
    categorieId: number
  ): Array<PlatList> =>
    plats
      .filter((p) => p.categorieId === categorieId)
      .map(platToPlatList);