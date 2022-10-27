import retrievePlatsWithCategories, { RetrievePlatsWithCategories } from 'Plats/daos/retrievePlatsWithCategories';
import { Carte } from 'Carte/models';
import * as _ from 'lodash';
import { PlatList, PlatListWithCategorie } from 'Plats/models';

type CategoriesWithPlats = { [key: string]: Array<PlatListWithCategorie> };

export class CarteService {
  private readonly retrievePlatsWithCategories: RetrievePlatsWithCategories;

  constructor(listPlatsWithCategories: RetrievePlatsWithCategories) {
    this.retrievePlatsWithCategories = listPlatsWithCategories;
  }

  getCarte = (): Promise<Carte> =>
    this.retrievePlatsWithCategories()
      .then(this.groupRowsByCategorie)
      .then(this.removeCategorieFromPlatLists);

  private groupRowsByCategorie = (rows: Array<PlatListWithCategorie>): CategoriesWithPlats =>
    _.groupBy(rows, (row) => row.categorie);

  private removeCategorieFromPlatLists = (categories: CategoriesWithPlats): Carte =>
    _.mapValues(categories, this.rowsToPlatLists);

  private rowsToPlatLists = (rows: Array<any>): Array<PlatList> =>
    rows.map((r) =>
      PlatList(r.id, r.nom, r.prix)
    );
}

const carteService = new CarteService(retrievePlatsWithCategories);

export default carteService;