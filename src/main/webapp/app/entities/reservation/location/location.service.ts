import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { ILocation } from '@/shared/model/reservation/location.model';
import { LocationType } from '@/shared/model/enumerations/location-type.model';

const baseApiUrl = 'services/reservation/api/locations';

export default class LocationService {
  public find(id: number): Promise<ILocation> {
    return new Promise<ILocation>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public findByZipcodeAndNumber(zipcode: string, number: string): Promise<ILocation> {
    return new Promise<ILocation>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/zipcode/${zipcode}/number/${number}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public findByLoginAndLocationType(login: string, locationType: LocationType): Promise<ILocation> {
    return new Promise<ILocation>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/login/${login}/locationType/${locationType}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: ILocation): Promise<ILocation> {
    return new Promise<ILocation>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(entity: ILocation): Promise<ILocation> {
    return new Promise<ILocation>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public partialUpdate(entity: ILocation): Promise<ILocation> {
    return new Promise<ILocation>((resolve, reject) => {
      axios
        .patch(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
