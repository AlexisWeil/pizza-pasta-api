import { Endpoint, Ok } from 'global/api';
import { Categorie } from 'Categories/models';
import knex from 'global/knex';
import { CategoriesService } from 'Categories/categoriesService';

export const listCategoriesAPI = (categoriesService: CategoriesService): Endpoint => (req) =>
  categoriesService.listCategories()
    .then(Ok);