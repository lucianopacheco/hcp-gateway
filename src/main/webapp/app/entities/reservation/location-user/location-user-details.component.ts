import { Component, Vue, Inject } from 'vue-property-decorator';

import { ILocationUser } from '@/shared/model/reservation/location-user.model';
import LocationUserService from './location-user.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class LocationUserDetails extends Vue {
  @Inject('locationUserService') private locationUserService: () => LocationUserService;
  @Inject('alertService') private alertService: () => AlertService;

  public locationUser: ILocationUser = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.locationUserId) {
        vm.retrieveLocationUser(to.params.locationUserId);
      }
    });
  }

  public retrieveLocationUser(locationUserId) {
    this.locationUserService()
      .find(locationUserId)
      .then(res => {
        this.locationUser = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
