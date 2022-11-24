import { BadRequest, Endpoint, Exception, NotFound, Ok } from 'global/api';
import { Request } from 'express';
import { Commande } from 'Commande/models';
import commandeService, { CommandeService } from './commandeService';
import * as jwt from 'jsonwebtoken';
import { CL } from 'webSocketServer/server';





export const updateStatutAPI = (commandeService: CommandeService): Endpoint => (req: Request) => {
  const id:number = Number(req.params.id); 
  return commandeService.updateCommande(id).then((id:number) => {
   return  Ok({message : 'La commande est prête a être servi :)'})
  });

}

export const addCommandeAPI = (commandeService: CommandeService): Endpoint => (req: Request) => {
  
  const token = req.headers["x-auth-token"];
  const Jtoken = JSON.parse(JSON.stringify(token))
  const data:any = jwt.verify(Jtoken, process.env['JWT_SECRET'] || 'secret');
  //const cuisineClient = clientService.getClientFromName(data.nom)
  CL.sendMessage('une commane a été passé ! :)')
  

  const userCommande: Commande = Commande(req.body.id_table,
                                          req.body.Plats, 
                                          req.body.prete)
  
  // cuisineClient[1].socket.on('commande', (commande:Commande) => {

  //   cuisineClient[1].socket.send('peroquet : '+ commande);
  // });


  return Promise.resolve(commandeService.addCommande(userCommande)).then(Ok);
}

export const getCommandeAPI = (commandeService: CommandeService): Endpoint => (req: Request) => {
  const id = Number(req.params.id)
  return commandeService.getCommandeById(id).then(Ok)
}




