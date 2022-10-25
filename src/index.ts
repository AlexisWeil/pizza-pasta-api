import * as express from 'express';
import { Carte } from 'Carte/models';
import { buildCarte } from 'Carte';
import { Categorie } from 'Categorie/models';
import { Plat, PlatList, platToPlatList } from 'Plat/models';

const app = express();
const port = 3000;

app.listen(port, () =>
  console.log('Server listening on port ' + port)
);

const categories: Array<Categorie> = [
  Categorie(1, 'Pizza'),
  Categorie(2, 'Pasta')
];

const plats: Array<Plat> = [
  Plat(1, 1, 'Quatre fromages', 12, 'Du fromage'),
  Plat(2, 1, 'Orientale', 13, 'Du chorizo et de la merguez'),
  Plat(3, 2, 'Pâtes pesto', 8, 'Du pesto')
];

app.get('/carte', (req, res) =>
  res.json(buildCarte(categories, plats))
);

app.get('/plat/:id', (req, res) => {
  const plat: Plat | undefined =
    plats.find((p) => p.id === Number(req.params.id));

  if (!plat) {
    res
      .status(404)
      .json({
        error: 'Plat inconnu'
      });
  }
  else {
    res.json(plat);
  }
});