import { BadRequest, Endpoint, Exception, NotFound, Ok } from 'global/api';
import { Request } from 'express';
import { Commande } from 'Commande/models';
import platsService, { PlatsService } from 'Plats/platsService';
import { number, OK, z } from 'zod';
import { validate } from 'global/validations';
import { Categorie } from 'Categories/models';
import knex from 'knex';
import commandeService, { CommandeService } from './commandeService';
import { getCommandeWithPlatList } from './models';
import { Plat } from 'Plats/models';





export const addCommandeAPI = (commandeService: CommandeService): Endpoint => (req: Request) => {
  
  const userCommande: Commande = Commande(req.body.id_table,
                                          req.body.Plats, 
                                          req.body.prete)       
  return Promise.resolve(commandeService.addCommande(userCommande)).then(Ok);
}


export const getCommandeAPI = (commandeService: CommandeService): Endpoint => (req: Request) => {
  const id = Number(req.params.id);
  if(isNaN(id)){
    return Promise.resolve(BadRequest([Exception('id', 'ID is not a number')]));
  }

  return Promise.resolve(commandeService.getCommandeById(id).then((commande) => {
    if(commande?.Plats){
      const idPlats = formatStringToArray(commande.Plats)

      return platsService.getPlatsByIds(idPlats).then((listPlat: Array<Plat>) => 
       Promise.resolve(getCommandeWithPlatList(commande.id, commande.id_table,listPlat,commande.prete))
      )
    }
  }).then(Ok))
  //

} 

  const formatStringToArray = (str: String): Array<number> => {

    let ids: Array<number> = [];
    for(let i = 0; i < str.length -1 ; i++){
      if(parseInt(str[i]))
        ids.push(Number(str[i]))
    }
    return ids;
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

