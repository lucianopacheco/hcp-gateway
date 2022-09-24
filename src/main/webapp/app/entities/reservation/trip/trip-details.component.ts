import { Component, Vue, Inject } from 'vue-property-decorator';

import { ITrip } from '@/shared/model/reservation/trip.model';
import TripService from './trip.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class TripDetails extends Vue {
  @Inject('tripService') private tripService: () => TripService;
  @Inject('alertService') private alertService: () => AlertService;

  public trip: ITrip = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.tripId) {
        vm.retrieveTrip(to.params.tripId);
      }
    });
  }

  public retrieveTrip(tripId) {
    this.tripService()
      .find(tripId)
      .then(res => {
        this.trip = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
