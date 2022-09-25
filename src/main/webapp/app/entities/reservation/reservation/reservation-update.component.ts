import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import TripService from '@/entities/reservation/trip/trip.service';
import { ITrip } from '@/shared/model/reservation/trip.model';

import { IReservation, Reservation } from '@/shared/model/reservation/reservation.model';
import ReservationService from './reservation.service';
import { ReservationStatus } from '@/shared/model/enumerations/reservation-status.model';

const validations: any = {
  reservation: {
    passengerLogin: {
      required,
    },
    status: {
      required,
    },
    createdAt: {
      required,
    },
    updatedAt: {},
    trip: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class ReservationUpdate extends Vue {
  @Inject('reservationService') private reservationService: () => ReservationService;
  @Inject('alertService') private alertService: () => AlertService;

  public reservation: IReservation = new Reservation();

  @Inject('tripService') private tripService: () => TripService;

  public trips: ITrip[] = [];
  public reservationStatusValues: string[] = Object.keys(ReservationStatus);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.reservationId) {
        vm.retrieveReservation(to.params.reservationId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.reservation.id) {
      this.reservationService()
        .update(this.reservation)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('reservationApp.reservationReservation.updated', { param: param.id });
          return this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.reservationService()
        .create(this.reservation)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('reservationApp.reservationReservation.created', { param: param.id });
          this.$root.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date && dayjs(date).isValid()) {
      return dayjs(date).format(DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.reservation[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.reservation[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.reservation[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.reservation[field] = null;
    }
  }

  public retrieveReservation(reservationId): void {
    this.reservationService()
      .find(reservationId)
      .then(res => {
        res.createdAt = new Date(res.createdAt);
        res.updatedAt = new Date(res.updatedAt);
        this.reservation = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.tripService()
      .retrieve()
      .then(res => {
        this.trips = res.data;
      });
  }
}
