import retrievePlatById, { RetrievePlatById } from 'Plats/daos/retrievePlatById';
import { Plat } from 'Plats/models';
import insertPlat, { InsertPlat } from 'Plats/daos/insertPlat';
import retrieveCategorieById, { RetrieveCategorieById } from 'Categories/daos/retrieveCategorieById';
import { Categorie } from 'Categories/models';
import { Exception, Ok } from 'global/api';
import updatePlat, { UpdatePlat } from 'Plats/daos/updatePlat';
import deletePlat, { DeletePlat } from 'Plats/daos/deletePlat';
import { Commande, CommandeJson, getCommande } from './models';
import insterCommande, {InsertCommande} from './daos/insertCommande';
import retrieveCommandeById, {RetrieveCommandeById} from './daos/retrieveCommandeById';




export class CommandeService {

  private readonly insertCommande : InsertCommande;
  private readonly retrieveCommandeById: RetrieveCommandeById;

  constructor(
    insertCommande : InsertCommande,
    retrieveCommandeById : RetrieveCommandeById

  ) {

    this.insertCommande = insertCommande;
    this.retrieveCommandeById = retrieveCommandeById;
  }

  getCommandeById = (id: number) : Promise<getCommande | undefined> => {
  
    return this.retrieveCommandeById(id)

  }

  addCommande = (commande: Commande) : Promise<Object> => {

    const platString = JSON.stringify(commande.Plats)
    const userCommandeJson = CommandeJson(commande.id_table, platString, commande.prete)

     return this.insertCommande(userCommandeJson);
  }

}
const commandeService =
  new CommandeService(
    insterCommande,
    retrieveCommandeById
  );

export default commandeService;