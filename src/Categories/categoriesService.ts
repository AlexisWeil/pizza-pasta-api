import retrieveCategories, { RetrieveCategories } from 'Categories/daos/retrieveCategories';
import insertCategorie, { InsertCategorie } from 'Categories/daos/insertCategorie';
import { Categorie } from 'Categories/models';
import updateCategorie, { UpdateCategorie } from 'Categories/daos/updateCategorie';
import deleteCategorie, { DeleteCategorie } from 'Categories/daos/deleteCategorie';

export class CategoriesService {
  private readonly retrieveCategories: RetrieveCategories;
  private readonly insertCategorie: InsertCategorie;
  private readonly updateCategorie: UpdateCategorie;
  private readonly deleteCategorie: DeleteCategorie;

  constructor(
    retrieveCategories: RetrieveCategories,
    insertCategorie: InsertCategorie,
    updateCategorie: UpdateCategorie,
    deleteCategorie: DeleteCategorie
  ) {
    this.retrieveCategories = retrieveCategories;
    this.insertCategorie = insertCategorie;
    this.updateCategorie = updateCategorie;
    this.deleteCategorie = deleteCategorie;
  }

  listCategories = () =>
    this.retrieveCategories();

  addCategorie = (categorie: Categorie): Promise<Categorie> =>
    this.insertCategorie(categorie)
      .then((id) => ({ ...categorie, id }));

  modifyCategorie = (categorie: Categorie): Promise<Categorie> =>
    this.updateCategorie(categorie);

  removeCategorie = (id: number) =>
    this.deleteCategorie(id);
}

const categoriesService =
  new CategoriesService(
    retrieveCategories,
    insertCategorie,
    updateCategorie,
    deleteCategorie
  );

export default categoriesService;