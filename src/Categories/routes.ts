import { Express } from 'express';
import { secure, useEndpoint } from 'global/api';
import { addCategorieAPI, deleteCategorieAPI, listCategoriesAPI, updateCategorieAPI } from 'Categories/api';
import categoriesService from 'Categories/categoriesService';

const categoriesRoutes = (app: Express) => {
  app.get('/categories', useEndpoint(listCategoriesAPI(categoriesService)));

  app.post('/categorie', useEndpoint(secure(addCategorieAPI(categoriesService))));

  app.put('/categorie/:id', useEndpoint(secure(updateCategorieAPI(categoriesService))));

  app.delete('/categorie/:id', useEndpoint(secure(deleteCategorieAPI(categoriesService))));
};

export default categoriesRoutes;