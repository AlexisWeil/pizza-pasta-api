import * as express from 'express';
import knex from 'global/knex';
import carteRoutes from 'Carte/routes';
import platsRoutes from 'Plats/routes';
import categoriesRoutes from 'Categories/routes';
import authentificationRoutes from 'Authentification/routes';
import commandesRoutes from 'Commandes/routes';
import { WebSocketServer } from 'ws';
import eventManager, { CommandePrete, NouvelleCommande } from 'Events';
import * as jwt from 'jsonwebtoken';
import { UserInfo } from 'Authentification/models';

const app = express();
const port = 3000;

app.use(express.json());

const server = app.listen(port, () =>
  console.log('Server listening on port ' + port)
);

const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (socket, req) => {
    wss.emit('connection', socket, req);
  });
});

wss.on('connection', (socket, req) => {
  const token = req.headers['x-auth-token'];

  if (typeof token === 'string') {
    try {
      const data: UserInfo = jwt.verify(token, process.env['JWT_SECRET'] || 'secret') as UserInfo;

      switch (data.role) {
        case 'CUISINE':
          eventManager.subscribe<NouvelleCommande>('NOUVELLE_COMMANDE', (data) => {
            socket.send(JSON.stringify({
                key: 'NOUVELLE_COMMANDE',
                commandeId: data.commandeId
              })
            );
          });
          break;
        case 'SERVEUR':
          data.tablesIds && data.tablesIds.forEach((tableId) =>
            eventManager.subscribe<CommandePrete>('COMMANDE_' + tableId + '_PRETE', (data) => {
              socket.send(JSON.stringify({
                key: 'COMMANDE_' + tableId + '_PRETE',
                tableId: data.tableId,
                commandeId: data.commandeId
              }))
            })
          );
          break;
      }
    } catch (e: any) {
      console.log('Unauthorized token');
      socket.send('Unauthorized token');
      socket.close();
    }
  } else {
    socket.send('Unauthorized token');
    socket.close();
  }
});

carteRoutes(app);
platsRoutes(app);
categoriesRoutes(app);
authentificationRoutes(app);
commandesRoutes(app);

knex.raw('SELECT VERSION()')
  .then((version) =>
    console.log('MySQL version : ', version[0][0]['VERSION()'])
  );

export default app;