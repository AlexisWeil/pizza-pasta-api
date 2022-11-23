import { PlatService} from "Plats/models";



  //----------------------------------------------------------
  //
  //                    COMMANDE 
  //
  //----------------------------------------------------------

  //----------------------------------------------------------
  // ARRAY NUMBER TYPE 


export interface Commande {
  id_table: number,
  Plats: Array<Number>,
  prete: boolean,
}

export const Commande = (
  id_table: number,
  Plats: Array<Number>,
  prete: boolean,
): Commande => ({
  id_table,
  Plats,
  prete,
});

  //----------------------------------------------------------
  // BDD FORMAT  


export interface CommandeToBDD {
  id_table: number,
  prete: boolean,
}

export const CommandeToBDD = (
  id_table: number,
  prete: boolean,
): CommandeToBDD => ({
  id_table,
  prete,
});

export const CommandeInsert = (
  id_table: number,
  prete: boolean,
) => ({
  id_table,
  prete
});



export const commandeToInsert = (commandeToBDD: CommandeToBDD) =>
  CommandeInsert(
    commandeToBDD.id_table,
    commandeToBDD.prete
  );


  //----------------------------------------------------------
  //
  //          PLATS - COMMANDE - ASSO 
  //
  //----------------------------------------------------------

export interface PlatsCommandeToBDD {
  id_commande: number,
  id_plats: Number,
}

export const PlatsCommandeToBDD = (
  id_commande: number,
  id_plats: Number,
): PlatsCommandeToBDD => ({
  id_commande,
  id_plats,
});


export const PlatsCommandeInsert = (
  id_commande: number,
  id_plats: Number,
) => ({
  id_commande,
  id_plats
});


export const PlatscommandeToInsert = (platsCommandeToBDD: PlatsCommandeToBDD) =>
PlatsCommandeInsert(
  platsCommandeToBDD.id_commande,
  platsCommandeToBDD.id_plats
  );


  //----------------------------------------------------------
  //
  //          PLATS & COMMANDE - GET - 
  //
  //----------------------------------------------------------

  
  export interface GetCommandeWithPlatService {
    id_commande: number,
    id_table: number,
    Plats: Array<PlatService> | undefined,
    prete: boolean,
  }

  export const getCommandeWithPlatService = (
    id_commande: number,
    id_table: number,
    Plats: Array<PlatService> | undefined,
    prete: boolean,
  ): GetCommandeWithPlatService => ({
    id_commande,
    id_table,
    Plats,
    prete,
  });



  //----------------------------------------------------------
  //
  //          OLD 
  //
  //----------------------------------------------------------



  export interface getCommande {
    id: number,
    id_table: number,
    prete: boolean,
  }

  export const getCommande = (
    id: number,
    id_table: number,
    prete: boolean,
  ): getCommande => ({
    id,
    id_table,
    prete,
  });
  


// //depreciated 
// export interface CommandeJson {
//   id_table: number,
//   Plats: String,
//   prete: boolean,
// }
// //depreciated 
// export const CommandeJson = (
//   id_table: number,
//   Plats: String,
//   prete: boolean,
// ): CommandeJson => ({
//   id_table,
//   Plats,
//   prete,
// });

