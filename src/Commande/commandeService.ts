import retrievePlatById, { RetrievePlatById } from 'Plats/daos/retrievePlatById';
import { Plat } from 'Plats/models';
import insertPlat, { InsertPlat } from 'Plats/daos/insertPlat';
import retrieveCategorieById, { RetrieveCategorieById } from 'Categories/daos/retrieveCategorieById';
import { Categorie } from 'Categories/models';
import { Exception } from 'global/api';
import updatePlat, { UpdatePlat } from 'Plats/daos/updatePlat';
import deletePlat, { DeletePlat } from 'Plats/daos/deletePlat';
import { Commande, CommandeJson, getCommande } from './models';
import insterCommande, {InsertCommande} from './daos/insertCommande';
import platsService from 'Plats/platsService';

export class CommandeService {
  private readonly retrievePlatById: RetrievePlatById;
  private readonly insertPlat: InsertPlat;
  private readonly retrieveCategorieById: RetrieveCategorieById;
  private readonly updatePlat: UpdatePlat;
  private readonly deletePlat: DeletePlat;
  private readonly insertCommande : InsertCommande;

  constructor(
    retrievePlatById: RetrievePlatById,
    insertPlat: InsertPlat,
    retrieveCategorieById: RetrieveCategorieById,
    updatePlat: UpdatePlat,
    deletePlat: DeletePlat,
    insertCommande : InsertCommande

  ) {
    this.retrievePlatById = retrievePlatById;
    this.insertPlat = insertPlat;
    this.retrieveCategorieById = retrieveCategorieById;
    this.updatePlat = updatePlat;
    this.deletePlat = deletePlat;
    this.insertCommande = insertCommande;
  }

  retriveCommandeById = (id: number) : Promise<any> => {

    return this.retriveCommandeById(id).then((commande) => {
        if(commande.Plats){
          const plats = commande.Plats.split(",");
          console.log(plats)

        }
    })

  }

  addCommande = (commande: Commande) : Promise<Object> => {

    const platString = JSON.stringify(commande.Plats)
    const userCommandeJson = CommandeJson(commande.id_table, platString, commande.prete)

     return this.insertCommande(userCommandeJson);
  }

}
const commandeService =
  new CommandeService(
    retrievePlatById,
    insertPlat,
    retrieveCategorieById,
    updatePlat,
    deletePlat,
    insterCommande
  );

export default commandeService;