import { BadRequest, Endpoint, Exception, NotFound, Ok } from 'global/api';
import { Request } from 'express';
import { Commande } from 'Commande/models';
import platsService, { PlatsService } from 'Plats/platsService';
import { OK, z } from 'zod';
import { validate } from 'global/validations';
import { Categorie } from 'Categories/models';
import knex from 'knex';
import commandeService, { CommandeService } from './commandeService';




export const addCommandeAPI = (commandeService: CommandeService): Endpoint => (req: Request) => {
  
  const userCommande: Commande = Commande(req.body.id_table,
                                          req.body.Plats, 
                                          req.body.prete)       
  return Promise.resolve(commandeService.addCommande(userCommande)).then(Ok);
}


export const getCommandeAPI = (): Endpoint => (req: Request) => {
  const id = Number(req.params.id)
  return commandeService.retriveCommandeById(id).then(Ok);

} 

const PlatForm = z.object({
  nom: z.string().max(30, { message: 'Nom du plat trop long' }),
  categorieId: z.number(),
  prix: z.number().min(0, { message: 'Les plats ne peuvent être gratuits' }),
  ingredients: z.string()
});

type PlatForm = z.infer<typeof PlatForm>;

export const addPlatAPI = (platsService: PlatsService): Endpoint => (req: Request) =>
  validate(PlatForm)(req.body)((plat: PlatForm) =>
    platsService.createPlat({ ...plat, id: 0 })
      .then(Ok)
  );

