import retrieveCategories, { RetrieveCategories } from 'Categories/daos/retrieveCategories';

export class CategoriesService {
  private readonly retrieveCategories: RetrieveCategories;

  constructor(retrieveCategories: RetrieveCategories) {
    this.retrieveCategories = retrieveCategories;
  }

  listCategories = () =>
    this.retrieveCategories();
}

const categoriesService = new CategoriesService(retrieveCategories);

export default categoriesService;