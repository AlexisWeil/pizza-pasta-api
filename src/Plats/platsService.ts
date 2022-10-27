import retrievePlatById, { RetrievePlatById } from 'Plats/daos/retrievePlatById';
import { Plat } from 'Plats/models';

export class PlatsService {
  private readonly retrievePlatById: RetrievePlatById;

  constructor(retrievePlatById: RetrievePlatById) {
    this.retrievePlatById = retrievePlatById;
  }

  getPlatById = (id: number): Promise<Plat | undefined> =>
    this.retrievePlatById(id);
}

const platsService = new PlatsService(retrievePlatById);

export default platsService;