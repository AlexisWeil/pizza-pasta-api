import retrievePlatById, { RetrievePlatById } from 'Plats/daos/retrievePlatById';
import { Plat } from 'Plats/models';
import insertPlat, { InsertPlat } from 'Plats/daos/insertPlat';
import retrieveCategorieById, { RetrieveCategorieById } from 'Categories/daos/retrieveCategorieById';
import { Categorie } from 'Categories/models';
import { Exception } from 'global/api';
import updatePlat, { UpdatePlat } from 'Plats/daos/updatePlat';
import deletePlat, { DeletePlat } from 'Plats/daos/deletePlat';

export class PlatsService {
  private readonly retrievePlatById: RetrievePlatById;
  private readonly insertPlat: InsertPlat;
  private readonly retrieveCategorieById: RetrieveCategorieById;
  private readonly updatePlat: UpdatePlat;
  private readonly deletePlat: DeletePlat;

  constructor(
    retrievePlatById: RetrievePlatById,
    insertPlat: InsertPlat,
    retrieveCategorieById: RetrieveCategorieById,
    updatePlat: UpdatePlat,
    deletePlat: DeletePlat
  ) {
    this.retrievePlatById = retrievePlatById;
    this.insertPlat = insertPlat;
    this.retrieveCategorieById = retrieveCategorieById;
    this.updatePlat = updatePlat;
    this.deletePlat = deletePlat;
  }



  getPlatsByIds = (id : Array<number>): Promise<Array<Plat>> => {
    let ListPlat:Array<Plat> = [];
    id.forEach((idPlat) => {
       this.retrievePlatById(idPlat).then((plat) => {
        if(plat != undefined){
           return ListPlat.push(plat);
        }
       });
    })

    return Promise.all(ListPlat);
  }

  getPlatById = (id: number): Promise<Plat | undefined> =>
    this.retrievePlatById(id);

  createPlat = (plat: Plat): Promise<Plat> =>
    this.checkIfCategorieExists(plat)
      .then(this.insertPlat)
      .then(this.addIdToPlat(plat));

  private checkIfCategorieExists = (plat: Plat): Promise<Plat> =>
    this.retrieveCategorieById(plat.categorieId)
      .then((cat: Categorie | undefined) => {
        if (!cat)
          throw Exception('categorieId', 'Catégorie inconnue');

        return plat;
      });

  private addIdToPlat = (plat: Plat) => (id: number) =>
    ({
      ...plat,
      id
    });

  modifyPlat = (plat: Plat): Promise<Plat> =>
    this.updatePlat(plat);

  removePlat = (id: number) =>
    this.deletePlat(id);
}

const platsService =
  new PlatsService(
    retrievePlatById,
    insertPlat,
    retrieveCategorieById,
    updatePlat,
    deletePlat
  );

export default platsService;