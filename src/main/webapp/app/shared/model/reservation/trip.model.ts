import { IVehicle } from '@/shared/model/reservation/vehicle.model';
import { ILocation } from '@/shared/model/reservation/location.model';

import { LocationType } from '@/shared/model/enumerations/location-type.model';
export interface ITrip {
  id?: number;
  driverLogin?: string;
  whenDateTime?: Date;
  destinationType?: LocationType;
  availableSeats?: number;
  price?: number;
  meetingPoint?: string | null;
  createdAt?: Date | null;
  vehicle?: IVehicle;
  from?: ILocation;
  to?: ILocation;
}

export class Trip implements ITrip {
  constructor(
    public id?: number,
    public driverLogin?: string,
    public whenDateTime?: Date,
    public destinationType?: LocationType,
    public availableSeats?: number,
    public price?: number,
    public meetingPoint?: string | null,
    public createdAt?: Date | null,
    public vehicle?: IVehicle,
    public from?: ILocation,
    public to?: ILocation
  ) {}
}
