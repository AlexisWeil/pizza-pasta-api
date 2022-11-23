import { BadRequest, Endpoint, Exception, NotFound, Ok } from 'global/api';
import { Request } from 'express';
import { Commande } from 'Commande/models';
import commandeService, { CommandeService } from './commandeService';




export const updateStatutAPI = (commandeService: CommandeService): Endpoint => (req: Request) => {
  const id:number = Number(req.params.id); 
  return commandeService.updateCommande(id).then((id:number) => {
   return  Ok({message : 'La commande est prête a être servi :)'})
  });

}

export const addCommandeAPI = (commandeService: CommandeService): Endpoint => (req: Request) => {
  
  const userCommande: Commande = Commande(req.body.id_table,
                                          req.body.Plats, 
                                          req.body.prete)       
  return Promise.resolve(commandeService.addCommande(userCommande)).then(Ok);
}

export const getCommandeAPI = (commandeService: CommandeService): Endpoint => (req: Request) => {
  const id = Number(req.params.id)
  return commandeService.getCommandeById(id).then(Ok)
}

// export const getCommandeAPI = (commandeService: CommandeService): Endpoint => (req: Request) => {
//   const id = Number(req.params.id);
//   if(isNaN(id)){
//     return Promise.resolve(BadRequest([Exception('id', 'ID is not a number')]));
//   }

//   return Promise.resolve(commandeService.getCommandeById(id).then((commande) => {
//     if(commande?.Plats){
//       const idPlats = formatStringToArray(commande.Plats)
//      //const idPlats = JSON.parse(commande.Plats)
//       return platsService.getPlatsByIds(idPlats).then((listPlat: Array<Plat>) => 
//        Promise.resolve(getCommandeWithPlatList(commande.id, commande.id_table,listPlat,commande.prete))
//       )
//     }
//   }).then(Ok))
//   //

// } 

  // const formatStringToArray = (str: String): Array<number> => {

  //   let ids: Array<number> = [];
  //   for(let i = 0; i < str.length -1 ; i++){
  //     if(parseInt(str[i]))
  //       ids.push(Number(str[i]))
  //   }
  //   return ids;
  // }



