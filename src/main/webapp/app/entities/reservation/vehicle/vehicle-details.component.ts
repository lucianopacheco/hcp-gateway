import { Component, Vue, Inject } from 'vue-property-decorator';

import { IVehicle } from '@/shared/model/reservation/vehicle.model';
import VehicleService from './vehicle.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class VehicleDetails extends Vue {
  @Inject('vehicleService') private vehicleService: () => VehicleService;
  @Inject('alertService') private alertService: () => AlertService;

  public vehicle: IVehicle = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.vehicleId) {
        vm.retrieveVehicle(to.params.vehicleId);
      }
    });
  }

  public retrieveVehicle(vehicleId) {
    this.vehicleService()
      .find(vehicleId)
      .then(res => {
        this.vehicle = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
