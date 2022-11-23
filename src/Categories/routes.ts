import { Express } from 'express';
import { secureCuisine, useEndpoint } from 'global/api';
import { addCategorieAPI, deleteCategorieAPI, listCategoriesAPI, updateCategorieAPI } from 'Categories/api';
import categoriesService from 'Categories/categoriesService';

const categoriesRoutes = (app: Express) => {
  app.get('/categories', useEndpoint(listCategoriesAPI(categoriesService)));

  app.post('/categorie', useEndpoint(secureCuisine(addCategorieAPI(categoriesService))));

  app.put('/categorie/:id', useEndpoint(secureCuisine(updateCategorieAPI(categoriesService))));

  app.delete('/categorie/:id', useEndpoint(secureCuisine(deleteCategorieAPI(categoriesService))));
};

export default categoriesRoutes;