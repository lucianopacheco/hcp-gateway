import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { IReservation } from '@/shared/model/reservation/reservation.model';

import ReservationService from './reservation.service';
import AlertService from '@/shared/alert/alert.service';
import { ReservationStatus } from '@/shared/model/enumerations/reservation-status.model';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Reservation extends Vue {
  @Inject('reservationService') private reservationService: () => ReservationService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public reservations: IReservation[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllReservations();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllReservations();
  }

  public retrieveAllReservations(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.reservationService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.reservations = res.data;
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

  public prepareRemove(instance: IReservation): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeReservation(): void {
    this.reservationService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('reservationApp.reservationReservation.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllReservations();
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
    this.retrieveAllReservations();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }

  public statusClass(status: ReservationStatus): string {
    if (status === ReservationStatus.CONFIRMED) {
      return "badge badge-success";
    }

    if (status === ReservationStatus.CANCELED) {
      return "badge badge-danger";
    }
  }
}
