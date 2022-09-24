export interface IVehicle {
  id?: number;
  model?: string;
  year?: number;
  plate?: string;
  driverLogin?: string;
}

export class Vehicle implements IVehicle {
  constructor(public id?: number, public model?: string, public year?: number, public plate?: string, public driverLogin?: string) {}
}
