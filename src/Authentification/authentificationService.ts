import insertUser, { InsertUser } from 'Authentification/daos/insertUser';
import retrieveUserByNom, { RetrieveUserByNom } from 'Authentification/daos/retrieveUserByNom';
import { User, UserInfo } from 'Authentification/models';
import { Exception } from 'global/api';
import * as bcrypt from 'bcrypt';

export class AuthentificationService {
  private readonly insertUser: InsertUser;
  private readonly retrieveUserByNom: RetrieveUserByNom;

  constructor(insertUser: InsertUser, retrieveUserByNom: RetrieveUserByNom) {
    this.insertUser = insertUser;
    this.retrieveUserByNom = retrieveUserByNom;
  }

  creerCompte = (user: User): Promise<UserInfo> =>
    bcrypt.hash(user.motDePasse, 10)
      .then((mdp) =>
        this.insertUser({
          ...user,
          motDePasse: mdp
        })
      ).then((id) =>
        ({
          id,
          nom: user.nom,
          role: user.role,
          serveurId: user.serveurId,
          tablesIds: user.tablesIds
        })
      );


  verificationConnexion = (nom: string, motDePasse: string): Promise<UserInfo> =>
    this.retrieveUserByNom(nom)
      .then((user) => {
        if (!user)
          throw Exception('username', 'Utilisateur inconnu');

        return bcrypt.compare(motDePasse, user.motDePasse)
          .then((mdpValid) => {
            if (mdpValid)
              return ({
                id: user.id,
                nom: user.nom,
                role: user.role,
                serveurId: user.serveurId,
                tablesIds: user.tablesIds
              });
            else
              throw Exception('motDePasse', 'Mot de passe incorrect');
          });
      });
}

const authentificationService = new AuthentificationService(insertUser, retrieveUserByNom);

export default authentificationService;