import { Express } from 'express';
import { useEndpoint } from 'global/api';
import { listCategoriesAPI } from 'Categories/api';
import categoriesService from 'Categories/categoriesService';

const categoriesRoutes = (app: Express) => {
  app.get('/categories', useEndpoint(listCategoriesAPI(categoriesService)))
};

export default categoriesRoutes;