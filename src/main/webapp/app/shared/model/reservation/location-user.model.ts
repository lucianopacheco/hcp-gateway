import { ILocation } from '@/shared/model/reservation/location.model';

import { LocationType } from '@/shared/model/enumerations/location-type.model';
export interface ILocationUser {
  id?: number;
  login?: string | null;
  locationType?: LocationType | null;
  location?: ILocation | null;
}

export class LocationUser implements ILocationUser {
  constructor(
    public id?: number,
    public login?: string | null,
    public locationType?: LocationType | null,
    public location?: ILocation | null
  ) {}
}
