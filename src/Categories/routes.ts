import { Express } from 'express';
import { secureAdmin, securePrivate, useEndpoint } from 'global/api';
import { addCategorieAPI, deleteCategorieAPI, listCategoriesAPI, updateCategorieAPI } from 'Categories/api';
import categoriesService from 'Categories/categoriesService';

const categoriesRoutes = (app: Express) => {
  app.get('/categories', useEndpoint(securePrivate(listCategoriesAPI(categoriesService))));

  app.post('/categorie', useEndpoint(secureAdmin(addCategorieAPI(categoriesService))));

  app.put('/categorie/:id', useEndpoint(secureAdmin(updateCategorieAPI(categoriesService))));

  app.delete('/categorie/:id', useEndpoint(secureAdmin(deleteCategorieAPI(categoriesService))));
};

export default categoriesRoutes;