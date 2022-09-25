import { ITrip } from '@/shared/model/reservation/trip.model';

import { ReservationStatus } from '@/shared/model/enumerations/reservation-status.model';
export interface IReservation {
  id?: number;
  passengerLogin?: string;
  status?: ReservationStatus;
  createdAt?: Date;
  updatedAt?: Date | null;
  trip?: ITrip;
}

export class Reservation implements IReservation {
  constructor(
    public id?: number,
    public passengerLogin?: string,
    public status?: ReservationStatus,
    public createdAt?: Date,
    public updatedAt?: Date | null,
    public trip?: ITrip
  ) {}
}
