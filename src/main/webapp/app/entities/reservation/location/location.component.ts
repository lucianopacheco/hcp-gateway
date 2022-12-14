import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ILocation } from '@/shared/model/reservation/location.model';

import LocationService from './location.service';
import AlertService from '@/shared/alert/alert.service';
import { LocationType } from '@/shared/model/enumerations/location-type.model';
import LocationUserService from '../location-user/location-user.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Location extends Vue {
  @Inject('locationService') private locationService: () => LocationService;
  @Inject('locationUserService') private locationUserService: () => LocationUserService
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public locations: ILocation[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllLocations();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllLocations();
  }

  public retrieveAllLocations(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.locationService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.locations = res.data;
          this.totalItems = Number(res.headers['x-total-count']);
          this.queryCount = this.totalItems;
          this.isFetching = false;
        },
        err => {
          this.isFetching = false;
          this.alertService().showHttpError(this, err.response);
        }
      );
  }

  public handleSyncList(): void {
    this.clear();
  }

  public prepareRemove(instance: ILocation): void {
    this.removeId = instance.locationUserId;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeLocation(): void {
    this.locationUserService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('reservationApp.reservationLocation.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllLocations();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public sort(): Array<any> {
    const result = [this.propOrder + ',' + (this.reverse ? 'desc' : 'asc')];
    if (this.propOrder !== 'id') {
      result.push('id');
    }
    return result;
  }

  public loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  public transition(): void {
    this.retrieveAllLocations();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  get isCondominiumLocationCreated(): boolean {
    if (this.locations) {
      return this.locations.filter(loc => loc.type === LocationType.HOME).length > 0;
    }
  }

  get isWorkLocationCreated(): boolean {
    if (this.locations) {
      return this.locations.filter(loc => loc.type === LocationType.LOCATION).length > 0;
    }
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
