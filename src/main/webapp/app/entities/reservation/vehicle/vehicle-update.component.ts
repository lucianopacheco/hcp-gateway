import { Component, Vue, Inject } from 'vue-property-decorator';

import { required, numeric } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import { IVehicle, Vehicle } from '@/shared/model/reservation/vehicle.model';
import VehicleService from './vehicle.service';

const validations: any = {
  vehicle: {
    model: {
      required,
    },
    year: {
      required,
      numeric,
    },
    plate: {
      required,
    }
  },
};

@Component({
  validations,
})
export default class VehicleUpdate extends Vue {
  @Inject('vehicleService') private vehicleService: () => VehicleService;
  @Inject('alertService') private alertService: () => AlertService;

  public vehicle: IVehicle = new Vehicle();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.vehicleId) {
        vm.retrieveVehicle(to.params.vehicleId);
      }
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
    if (this.vehicle.id) {
      this.vehicleService()
        .update(this.vehicle)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('reservationApp.reservationVehicle.updated', { param: param.id });
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
      this.vehicleService()
        .create(this.vehicle)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('reservationApp.reservationVehicle.created', { param: param.id });
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

  public retrieveVehicle(vehicleId): void {
    this.vehicleService()
      .find(vehicleId)
      .then(res => {
        this.vehicle = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
