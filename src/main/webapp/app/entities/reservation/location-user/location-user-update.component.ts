import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import LocationService from '@/entities/reservation/location/location.service';
import { ILocation } from '@/shared/model/reservation/location.model';

import { ILocationUser, LocationUser } from '@/shared/model/reservation/location-user.model';
import LocationUserService from './location-user.service';
import { LocationType } from '@/shared/model/enumerations/location-type.model';

const validations: any = {
  locationUser: {
    login: {},
    locationType: {},
  },
};

@Component({
  validations,
})
export default class LocationUserUpdate extends Vue {
  @Inject('locationUserService') private locationUserService: () => LocationUserService;
  @Inject('alertService') private alertService: () => AlertService;

  public locationUser: ILocationUser = new LocationUser();

  @Inject('locationService') private locationService: () => LocationService;

  public locations: ILocation[] = [];
  public locationTypeValues: string[] = Object.keys(LocationType);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.locationUserId) {
        vm.retrieveLocationUser(to.params.locationUserId);
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
    if (this.locationUser.id) {
      this.locationUserService()
        .update(this.locationUser)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('reservationApp.reservationLocationUser.updated', { param: param.id });
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
      this.locationUserService()
        .create(this.locationUser)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('reservationApp.reservationLocationUser.created', { param: param.id });
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

  public retrieveLocationUser(locationUserId): void {
    this.locationUserService()
      .find(locationUserId)
      .then(res => {
        this.locationUser = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.locationService()
      .retrieve()
      .then(res => {
        this.locations = res.data;
      });
  }
}
