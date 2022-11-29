import { describe, expect, it } from '@jest/globals';
import { addCommandeAPI } from 'Commandes/api';
import commandesService from 'Commandes/commandesService';
import { BadRequest, Exception, FakeRequest, fakeSecure, secure, Unauthorized } from 'global/api';

const api = addCommandeAPI(commandesService, fakeSecure);

describe('Test addCommandeAPI', () => {

  it('should return Unauthorized if the user is not logged in', async () => {
    const req = new FakeRequest();

    await api(req).then((res) =>
      expect(res).toEqual(
        Unauthorized()
      )
    );
  });

  it ('should return BadRequest if data are missing', async () => {
    const req = new FakeRequest()
      .withHeaders({ 'X-Auth-Token': 'table1' });

    await api(req).then((res) =>
      expect(res).toEqual(
        BadRequest([
          Exception('tableId', 'Required'),
          Exception('plats', 'Required')
        ])
      )
    );
  });

});