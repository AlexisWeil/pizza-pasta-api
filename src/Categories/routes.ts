import { Express } from 'express';
import { useEndpoint } from 'global/api';
import { addCategorieAPI, deleteCategorieAPI, listCategoriesAPI, updateCategorieAPI } from 'Categories/api';
import categoriesService from 'Categories/categoriesService';

const categoriesRoutes = (app: Express) => {
  app.get('/categories', useEndpoint(listCategoriesAPI(categoriesService)));

  app.post('/categorie', useEndpoint(addCategorieAPI(categoriesService)));

  app.put('/categorie/:id', useEndpoint(updateCategorieAPI(categoriesService)));

  app.delete('/categorie/:id', useEndpoint(deleteCategorieAPI(categoriesService)));
};

export default categoriesRoutes;