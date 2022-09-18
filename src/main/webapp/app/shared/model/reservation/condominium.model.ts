export interface ICondominium {
  id?: number;
  name?: string;
}

export class Condominium implements ICondominium {
  constructor(public id?: number, public name?: string) {}
}
