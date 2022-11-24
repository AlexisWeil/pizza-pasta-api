import retrievePlatById, { RetrievePlatById } from 'Plats/daos/retrievePlatById';
import { Plat } from 'Plats/models';
import { Exception, Ok } from 'global/api';
import { Commande, PlatsCommandeToBDD, CommandeToBDD } from './models';
import insterCommande, {InsertCommande} from './daos/insertCommande';
import retrieveCommandeById, {RetrieveCommandeById} from './daos/retrieveCommandeById';
import updateStatutCommande, {UpdateStatutCommande} from './daos/updateCommande';






export class CommandeService {

  private readonly insertCommande : InsertCommande;
  private readonly retrieveCommandeById: RetrieveCommandeById;
  private readonly updateStatutCommande: UpdateStatutCommande;


  constructor(
    insertCommande : InsertCommande,
    retrieveCommandeById : RetrieveCommandeById,
    updateStatutCommande: UpdateStatutCommande,


  ) {

    this.insertCommande = insertCommande;
    this.retrieveCommandeById = retrieveCommandeById;
    this.updateStatutCommande = updateStatutCommande;

  }

  getCommandeById = (id: number) : Promise<any> => {
    return this.retrieveCommandeById(id)
  }

  addCommande = (commande: Commande) : Promise<Object> => {


    const userCommande = CommandeToBDD(commande.id_table, commande.prete)
    //const userCommandeJson = CommandeJson(commande.id_table, platString, commande.prete)
     
     return this.insertCommande(userCommande, commande.Plats)
  }



  updateCommande = (idCommande: number) => {
    return this.updateStatutCommande(idCommande);
  }

}
const commandeService =
  new CommandeService(
    insterCommande,
    retrieveCommandeById,
    updateStatutCommande,

  );

export default commandeService;