import { Endpoint, Ok } from 'global/api';
import { Categorie } from 'Categories/models';
import knex from 'global/knex';
import categoriesService, { CategoriesService } from 'Categories/categoriesService';
import { z } from 'zod';
import { validate } from 'global/validations';
import UpdateCategorie from 'Categories/daos/updateCategorie';

export const listCategoriesAPI = (categoriesService: CategoriesService): Endpoint => () =>
  categoriesService.listCategories()
    .then(Ok);


const CategorieForm = z.object({
  nom: z.string()
    .max(30, { message: 'Nom de la catégorie trop long' })
});

type CategorieForm = z.infer<typeof CategorieForm>;

export const addCategorieAPI = (categoriesService: CategoriesService): Endpoint => (req) =>
  validate(CategorieForm)(req.body)((categorie: CategorieForm) =>
    categoriesService.addCategorie({ ...categorie, id: 0 })
      .then(Ok)
  );


const UpdateCategorieForm =
  CategorieForm.and(
    z.object({
      id: z.number()
    })
  );

type UpdateCategorieForm = z.infer<typeof UpdateCategorieForm>;

export const updateCategorieAPI = (categoriesService: CategoriesService): Endpoint => (req) =>
  validate(UpdateCategorieForm)
    ({ ...req.body, id: Number(req.params.id) })
    ((categorie: UpdateCategorieForm) =>
      categoriesService.modifyCategorie(categorie)
        .then(Ok)
    );

export const deleteCategorieAPI = (categoriesService: CategoriesService): Endpoint => (req) =>
  validate(z.number())
  (Number(req.params.id))
  ((id: number) =>
    categoriesService.removeCategorie(id)
      .then(() => Ok())
  );