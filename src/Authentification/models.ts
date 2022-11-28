
type Role = 'TABLE' | 'CUISINE' | 'SERVEUR';

export interface UserInfo {
  id: number,
  nom: string,
  role: Role,
  serveurId?: number,
  tablesIds?: Array<number>
}

export const UserInfo = (
  id: number,
  nom: string,
  role: Role,
  serveurId?: number,
  tablesIds?: Array<number>
): UserInfo => ({
  id,
  nom,
  role,
  serveurId,
  tablesIds
});

export interface User {
  id: number,
  nom: string,
  motDePasse: string,
  role: Role,
  serveurId?: number,
  tablesIds?: Array<number>
}

export const User = (
  id: number,
  nom: string,
  motDePasse: string,
  role: Role,
  serveurId?: number,
  tablesIds?: Array<number>
): User => ({
  id,
  nom,
  motDePasse,
  role,
  serveurId,
  tablesIds
});