import {PlatList} from "Plats/models";


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

export interface CommandeJson {
  id_table: number,
  Plats: String,
  prete: boolean,
}

export const CommandeJson = (
  id_table: number,
  Plats: String,
  prete: boolean,
): CommandeJson => ({
  id_table,
  Plats,
  prete,
});

export const CommandeInsert = (
  id_table: number,
  Plats: String,
  prete: boolean,
) => ({
  id_table,
  Plats,
  prete
});

export const commandeToInsert = (commandeJson: CommandeJson) =>
  CommandeInsert(
    commandeJson.id_table,
    commandeJson.Plats,
    commandeJson.prete
  );

  export interface getCommande {
    id_table: number,
    Plats: String,
    prete: boolean,
  }

  export const getCommande = (
    id_table: number,
    Plats: String,
    prete: boolean,
  ): getCommande => ({
    id_table,
    Plats,
    prete,
  });
  

  
  export interface getCommandeWithPlatList {
    id_table: number,
    Plats: PlatList,
    prete: boolean,
  }

  export const getCommandeWithPlatList = (
    id_table: number,
    Plats: PlatList,
    prete: boolean,
  ): getCommandeWithPlatList => ({
    id_table,
    Plats,
    prete,
  });

