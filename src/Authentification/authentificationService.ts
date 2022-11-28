import insertUser, { InsertUser } from 'Authentification/daos/insertUser';
import retrieveUserByNom, { RetrieveUserByNom } from 'Authentification/daos/retrieveUserByNom';
import { User, UserInfo } from 'Authentification/models';
import { Exception } from 'global/api';
import * as bcrypt from 'bcrypt';
import { Either, Left, Maybe, None, Right, Some } from 'monet';

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


  verificationConnexion = (nom: string, motDePasse: string): Promise<Maybe<UserInfo>> =>
    this.retrieveUserByNom(nom)
    .then((user) => 
      user.cata(
        () => None(),
        (usr) => bcrypt.compare(motDePasse, usr.motDePasse)
          .then((mdpValid) =>
            mdpValid?
              Some(UserInfo(usr.id, usr.nom, usr.role, usr.serveurId, usr.tablesIds))
              :
              None()
          )
      )
    )

const authentificationService = new AuthentificationService(insertUser, retrieveUserByNom);

export default authentificationService;