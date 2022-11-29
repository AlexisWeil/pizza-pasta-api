import * as z from 'zod';
import { BadRequest, Endpoint, Exception, Ok } from 'global/api';
import commandesService, { CommandesService } from 'Commandes/commandesService';
import { validate } from 'global/validations';
import commandeService from 'Commandes/commandesService';

const CommandeForm = z.object({
  tableId: z.number(),
  plats: z.array(z.number())
});

type CommandeForm = z.infer<typeof CommandeForm>;

export const addCommandeAPI = (commandesService: CommandesService): Endpoint => (req) =>
  validate(CommandeForm)(req.body)((commande) =>
    commandesService.createCommande(commande)
      .then((eCommande) =>
        eCommande.cata(
          BadRequest,
          Ok
        )
      )
  );

export const getCommandeByIdAPI = (commandesService: CommandesService): Endpoint => (req) => {
  const id = Number(req.params.id);

  if (isNaN(id))
    return Promise.resolve(BadRequest([Exception('id', 'ID is not a number')]));

  return commandeService.getCommandeById(id)
    .then(Ok);
};

export const setCommandePreteAPI = (commandesService: CommandesService): Endpoint => (req) => {
  const id = Number(req.params.id);

  if (isNaN(id))
    return Promise.resolve(BadRequest([Exception('id', 'ID is not a number')]));

  return commandeService.modifyCommandeStatut(id, true)
    .then(() => Ok());
};
