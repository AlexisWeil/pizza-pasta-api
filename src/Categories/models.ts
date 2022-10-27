export interface Categorie {
  id: number,
  nom: string
}

export const Categorie = (id: number, nom: string): Categorie => ({
  id,
  nom
});