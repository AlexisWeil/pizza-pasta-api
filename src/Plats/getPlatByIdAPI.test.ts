import { describe, expect, it } from '@jest/globals';
import { PlatsService } from 'Plats/platsService';
import { fakeRetrievePlatById } from 'Plats/daos/retrievePlatById';
import insertPlat from 'Plats/daos/insertPlat';
import updatePlat from 'Plats/daos/updatePlat';
import deletePlat from 'Plats/daos/deletePlat';
import retrieveCategorieById from 'Categories/daos/retrieveCategorieById';
import { Right, Some } from 'monet';
import { getPlatByIdAPI } from 'Plats/api';
import { BadRequest, Exception, FakeRequest, NotFound, Ok } from 'global/api';

describe('Test getPlatByIdAPI', () => {
  const platsService = new PlatsService(fakeRetrievePlatById, insertPlat, retrieveCategorieById, updatePlat, deletePlat);
  const api = getPlatByIdAPI(platsService);

  it('should return a plat if it exists', async () => {
    const req = new FakeRequest().withParams({ id: "0" });

    await api(req).then((res) =>
      expect(res).toEqual(
        Ok({
          id: 0,
          categorieId: 0,
          nom: 'Plat 1',
          prix: 50,
          ingredients: 'Ingredients'
        })
      )
    )
  });

  it('should return BadRequest if the ID is invalid', async () => {
    const req = new FakeRequest().withParams({id: 'fail'});

    await api(req).then((res) =>
      expect(res).toEqual(
        BadRequest([
          Exception('id', 'ID is not a number')
        ])
      )
    );
  });

  it('should return NotFound if the plat does not exist', async () => {
    const req = new FakeRequest().withParams({id: '-1'});

    await api(req).then((res) =>
      expect(res).toEqual(
        NotFound('Plat inconnu')
      )
    );
  });

});