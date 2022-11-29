import { Endpoint, Ok } from 'global/api';
import { Request } from 'express';
import { CarteService } from 'Carte/carteService';

export const getCarteAPI = (carteService: CarteService): Endpoint => (req) =>
  carteService
    .getCarte()
    .then(Ok);