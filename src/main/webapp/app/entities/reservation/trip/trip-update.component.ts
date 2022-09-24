import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, numeric, decimal } from 'vuelidate/lib/validators';
import dayjs from 'dayjs';
import { DATE_TIME_LONG_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';

import VehicleService from '@/entities/reservation/vehicle/vehicle.service';
import { IVehicle } from '@/shared/model/reservation/vehicle.model';

import LocationService from '@/entities/reservation/location/location.service';
import { ILocation } from '@/shared/model/reservation/location.model';

import { ITrip, Trip } from '@/shared/model/reservation/trip.model';
import TripService from './trip.service';
import { LocationType } from '@/shared/model/enumerations/location-type.model';

const validations: any = {
  trip: {
    driverLogin: {
      required,
    },
    whenDateTime: {
      required,
    },
    destinationType: {
      required,
    },
    availableSeats: {
      required,
      numeric,
    },
    price: {
      required,
      decimal,
    },
    meetingPoint: {},
    createdAt: {},
    vehicle: {
      required,
    },
    from: {
      required,
    },
    to: {
      required,
    },
  },
};

@Component({
  validations,
})
export default class TripUpdate extends Vue {
  @Inject('tripService') private tripService: () => TripService;
  @Inject('alertService') private alertService: () => AlertService;

  public trip: ITrip = new Trip();

  @Inject('vehicleService') private vehicleService: () => VehicleService;

  public vehicles: IVehicle[] = [];

  @Inject('locationService') private locationService: () => LocationService;

  public locations: ILocation[] = [];
  public locationTypeValues: string[] = Object.keys(LocationType);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.tripId) {
        vm.retrieveTrip(to.params.tripId);
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
    if (this.trip.id) {
      this.tripService()
        .update(this.trip)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('reservationApp.reservationTrip.updated', { param: param.id });
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
      this.tripService()
        .create(this.trip)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('reservationApp.reservationTrip.created', { param: param.id });
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
      this.trip[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.trip[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.trip[field] = dayjs(event.target.value, DATE_TIME_LONG_FORMAT);
    } else {
      this.trip[field] = null;
    }
  }

  public retrieveTrip(tripId): void {
    this.tripService()
      .find(tripId)
      .then(res => {
        res.whenDateTime = new Date(res.whenDateTime);
        res.createdAt = new Date(res.createdAt);
        this.trip = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.vehicleService()
      .retrieve()
      .then(res => {
        this.vehicles = res.data;
      });
    this.locationService()
      .retrieve()
      .then(res => {
        this.locations = res.data;
      });
  }
}
