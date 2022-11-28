import retrievePlatById, { RetrievePlatById } from 'Plats/daos/retrievePlatById';
import { Plat } from 'Plats/models';
import insertPlat, { InsertPlat } from 'Plats/daos/insertPlat';
import retrieveCategorieById, { RetrieveCategorieById } from 'Categories/daos/retrieveCategorieById';
import { Categorie } from 'Categories/models';
import { Exception } from 'global/api';
import updatePlat, { UpdatePlat } from 'Plats/daos/updatePlat';
import deletePlat, { DeletePlat } from 'Plats/daos/deletePlat';
import { Either, Left, Maybe, Right } from 'monet';

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

  getPlatById = (id: number): Promise<Maybe<Plat>> =>
    this.retrievePlatById(id);

  createPlat = (plat: Plat): Promise<Either<Exception, Plat>> =>
    this.checkIfCategorieExists(plat)
      .then(this.insertPlatIfAllowed)
      .then(this.addIdToPlat(plat));

  private checkIfCategorieExists = (plat: Plat): Promise<Either<Exception, Plat>> =>
    this.retrieveCategorieById(plat.categorieId)
      .then((eCat: Either<Exception, Maybe<Categorie>>) =>
        eCat.flatMap((cat) =>
          cat.cata(
            () => Left(Exception('categorieId', 'Catégorie inconnue')),
            () => Right(plat)
          )
        )
      );

  private insertPlatIfAllowed = (ePlat: Either<Exception, Plat>): Promise<Either<Exception, number>> =>
    ePlat.cata(
      (e) => Promise.resolve(Left(e)),
      (plat) => this.insertPlat(plat)
    );

  private addIdToPlat = (plat: Plat) => (eId: Either<Exception, number>): Either<Exception, Plat> =>
    eId.map((id) =>
      ({
        ...plat,
        id
      })
    );

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