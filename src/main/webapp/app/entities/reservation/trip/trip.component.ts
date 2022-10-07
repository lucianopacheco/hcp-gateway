import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ITrip } from '@/shared/model/reservation/trip.model';

import TripService from './trip.service';
import AlertService from '@/shared/alert/alert.service';
import ReservationService from '../reservation/reservation.service';
import { Reservation } from '@/shared/model/reservation/reservation.model';
import { ReservationStatus } from '@/shared/model/enumerations/reservation-status.model';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class Trip extends Vue {
  @Inject('tripService') private tripService: () => TripService;
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('reservationService') private reservationService: () => ReservationService;

  private removeId: number = null;
  public itemsPerPage = 20;
  public queryCount: number = null;
  public page = 1;
  public previousPage = 1;
  public propOrder = 'id';
  public reverse = false;
  public totalItems = 0;

  public trips: ITrip[] = [];
  public tripToReservation: ITrip;
  public reservation: Reservation;

  public isFetching = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.path == '/trip-driver') {
        vm.retrieveAllTrips();
      } else {
        vm.retrieveAllTripsByLocations();
      }
    });
  }

  public mounted(): void {
    //this.retrieveAllTrips();
  }

  public clear(): void {
    this.page = 1;
    this.retrieveAllTrips();
  }

  public retrieveAllTrips(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.tripService()
      .retrieve(paginationQuery)
      .then(
        res => {
          this.trips = res.data;
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

  public retrieveAllTripsByLocations(): void {
    this.isFetching = true;
    const paginationQuery = {
      page: this.page - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
    };
    this.tripService()
      .retrieveByLocations(1001, 10, paginationQuery)
      .then(
        res => {
          this.trips = res.data;
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

  public prepareRemove(instance: ITrip): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public prepareReservation(instance: ITrip): void {
    this.tripToReservation = instance;
    if (<any>this.$refs.reserveEntity) {
      (<any>this.$refs.reserveEntity).show();
    }
  }

  public removeTrip(): void {
    this.tripService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('reservationApp.reservationTrip.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllTrips();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public reserveTrip(): void {
    this.reservation = new Reservation(null, this.username, ReservationStatus.CONFIRMED, new Date(), 
      new Date(), this.tripToReservation);

    this.reservationService()
      .create(this.reservation)
      .then(() => {
        const message = this.$t('reservationApp.reservationTrip.created', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'success',
          solid: true,
          autoHideDelay: 5000,
        });
        this.tripToReservation = null;
        this.closeReserveDialog();
        this.$router.push("/reservation");
      })
      .catch(error => {
        this.closeReserveDialog();
        console.log(error);
        console.log(error.response);
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
    this.retrieveAllTrips();
  }

  public changeOrder(propOrder): void {
    this.propOrder = propOrder;
    this.reverse = !this.reverse;
    this.transition();
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }

  public closeReserveDialog(): void {
    (<any>this.$refs.reserveEntity).hide();
  }

  public get username(): string {
    return this.$store.getters.account?.login ?? '';
  }
}
