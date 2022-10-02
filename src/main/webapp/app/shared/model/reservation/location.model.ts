import { LocationType } from '@/shared/model/enumerations/location-type.model';
export interface ILocation {
  id?: number;
  existedId?: number;
  name?: string;
  zipcode?: string;
  address?: string | null;
  number?: string;
  city?: string;
  state?: string;
  type?: LocationType | null;
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public existedId?: number,
    public name?: string,
    public zipcode?: string,
    public address?: string | null,
    public number?: string,
    public city?: string,
    public state?: string,
    public type?: LocationType | null
  ) {}
}
