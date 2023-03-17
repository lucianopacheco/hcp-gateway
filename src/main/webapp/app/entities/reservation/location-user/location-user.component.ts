import { Component, Vue, Inject } from 'vue-property-decorator';
import Vue2Filters from 'vue2-filters';
import { ILocationUser } from '@/shared/model/reservation/location-user.model';

import LocationUserService from './location-user.service';
import AlertService from '@/shared/alert/alert.service';

@Component({
  mixins: [Vue2Filters.mixin],
})
export default class LocationUser extends Vue {
  @Inject('locationUserService') private locationUserService: () => LocationUserService;
  @Inject('alertService') private alertService: () => AlertService;

  private removeId: number = null;

  public locationUsers: ILocationUser[] = [];

  public isFetching = false;

  public mounted(): void {
    this.retrieveAllLocationUsers();
  }

  public clear(): void {
    this.retrieveAllLocationUsers();
  }

  public retrieveAllLocationUsers(): void {
    this.isFetching = true;
    this.locationUserService()
      .retrieve()
      .then(
        res => {
          this.locationUsers = res.data;
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

  public prepareRemove(instance: ILocationUser): void {
    this.removeId = instance.id;
    if (<any>this.$refs.removeEntity) {
      (<any>this.$refs.removeEntity).show();
    }
  }

  public removeLocationUser(): void {
    this.locationUserService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('reservationApp.reservationLocationUser.deleted', { param: this.removeId });
        this.$bvToast.toast(message.toString(), {
          toaster: 'b-toaster-top-center',
          title: 'Info',
          variant: 'danger',
          solid: true,
          autoHideDelay: 5000,
        });
        this.removeId = null;
        this.retrieveAllLocationUsers();
        this.closeDialog();
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
