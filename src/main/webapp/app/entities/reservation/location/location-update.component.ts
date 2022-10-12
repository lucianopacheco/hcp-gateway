import { Component, Vue, Inject } from 'vue-property-decorator';

import { required } from 'vuelidate/lib/validators';

import AlertService from '@/shared/alert/alert.service';

import { ILocation, Location } from '@/shared/model/reservation/location.model';
import LocationService from './location.service';
import { LocationType } from '@/shared/model/enumerations/location-type.model';

const validations: any = {
  location: {
    name: {
      required,
    },
    zipcode: {
      required,
    },
    address: {},
    number: {
      required,
    },
    city: {
      required,
    },
    state: {
      required,
    },
    type: {},
  },
};

@Component({
  validations,
})
export default class LocationUpdate extends Vue {
  @Inject('locationService') private locationService: () => LocationService;
  @Inject('alertService') private alertService: () => AlertService;

  public location: ILocation = new Location();
  public locationTypeValues: string[] = Object.keys(LocationType);
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.setLocationType(to.meta.locationType);
      if (to.params.locationId) {
        vm.retrieveLocation(to.params.locationId, to.meta.locationType);
      }
    });
  }

  public setLocationType(type: LocationType): void {
    this.location.type = type;
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
    if (this.location.id) {
      this.locationService()
        .update(this.location)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('reservationApp.reservationLocation.updated', { param: param.id });
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
      this.locationService()
        .create(this.location)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('reservationApp.reservationLocation.created', { param: param.id });
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

  public retrieveLocation(locationId: number, type: LocationType): void {
    this.locationService()
      .find(locationId)
      .then(res => {
        this.location = res;
        this.location.type = type;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public retrieveLocationByZipcodeAndNumber(): void {

    if (!this.location.zipcode || !this.location.number) {
      return;
    }

    this.locationService()
      .findByZipcodeAndNumber(this.location.zipcode, this.location.number)
      .then(res => {
        this.location.existedId = res.id;
        this.location.id = null;
        this.location.name = res.name;
        this.location.address = res.address;
        this.location.city = res.city;
        this.location.state = res.state;
      })
      .catch(error => {
        this.location.id = null;
        this.location.name = "";
        this.location.address = "";
        this.location.city = "";
        this.location.state = "";
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}

  get locationLabel(): string {
    return this.location.type === LocationType.HOME ? 'hcpgatewayApp.reservationLocation.nameHome' : 
      'hcpgatewayApp.reservationLocation.nameWork';
  }
}
