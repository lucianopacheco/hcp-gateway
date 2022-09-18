import { Component, Vue, Inject } from 'vue-property-decorator';

import { ICondominium } from '@/shared/model/reservation/condominium.model';
import CondominiumService from './condominium.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class CondominiumDetails extends Vue {
  @Inject('condominiumService') private condominiumService: () => CondominiumService;
  @Inject('alertService') private alertService: () => AlertService;

  public condominium: ICondominium = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.condominiumId) {
        vm.retrieveCondominium(to.params.condominiumId);
      }
    });
  }

  public retrieveCondominium(condominiumId) {
    this.condominiumService()
      .find(condominiumId)
      .then(res => {
        this.condominium = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
