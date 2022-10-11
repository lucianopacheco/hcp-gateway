import { Component, Inject, Vue } from 'vue-property-decorator';
import LoginService from '@/account/login.service';
import AccountService from '@/account/account.service';
import TranslationService from '@/locale/translation.service';

import EntitiesMenu from '@/entities/entities-menu.vue';
import UserManagementService from '@/admin/user-management/user-management.service';
import { IUser } from '@/shared/model/user.model';
import AlertService from '@/shared/alert/alert.service';

@Component({
  components: {
    'entities-menu': EntitiesMenu,
  },
})
export default class JhiNavbar extends Vue {
  @Inject('loginService')
  private loginService: () => LoginService;
  @Inject('translationService') private translationService: () => TranslationService;
  @Inject('userManagementService') private userManagementService: () => UserManagementService;
  @Inject('accountService') private accountService: () => AccountService;
  @Inject('alertService') private alertService: () => AlertService;
  public version = 'v' + VERSION;
  private currentLanguage = this.$store.getters.currentLanguage;
  private languages: any = this.$store.getters.languages;
  private hasAnyAuthorityValues = {};
  public userAccount: IUser;

  created() {
    this.translationService().refreshTranslation(this.currentLanguage);
  }

  public subIsActive(input) {
    const paths = Array.isArray(input) ? input : [input];
    return paths.some(path => {
      return this.$route.path.indexOf(path) === 0; // current path starts with this path string
    });
  }

  public changeLanguage(newLanguage: string): void {
    this.translationService().refreshTranslation(newLanguage);
  }

  public isActiveLanguage(key: string): boolean {
    return key === this.$store.getters.currentLanguage;
  }

  public logout(): Promise<any> {
    localStorage.removeItem('jhi-authenticationToken');
    sessionStorage.removeItem('jhi-authenticationToken');
    this.$store.commit('logout');
    if (this.$route.path !== '/') {
      return this.$router.push('/');
    }
    return Promise.resolve(this.$router.currentRoute);
  }

  public openLogin(): void {
    this.loginService().openLogin((<any>this).$root);
  }

  public get authenticated(): boolean {
    return this.$store.getters.authenticated;
  }

  public hasAnyAuthority(authorities: any): boolean {
    this.accountService()
      .hasAnyAuthorityAndCheckAuth(authorities)
      .then(value => {
        this.hasAnyAuthorityValues[authorities] = value;
      });
    return this.hasAnyAuthorityValues[authorities] ?? false;
  }

  public get openAPIEnabled(): boolean {
    return this.$store.getters.activeProfiles.indexOf('api-docs') > -1;
  }

  public get inProduction(): boolean {
    return this.$store.getters.activeProfiles.indexOf('prod') > -1;
  }

  public get username(): string {
    return this.$store.getters.account?.login ?? '';
  }

  public get userId(): string {
    return this.$store.getters.account?.id ?? '';
  }

  public hasAuthority(expectedRole: any): boolean {
    const userAuthorities = this.$store.getters.account?.authorities;
    return userAuthorities?.filter(auth => auth === expectedRole).length > 0;
  }

  public get userRole(): string {

    if (!this.authenticated) {
      return;
    }

    let role = "";

    if (this.hasAuthority('ROLE_ADMIN')) {
      return "(ADMIN)";
    }
    if (this.hasAuthority('ROLE_USER')) {
      //role = "(USER) ";
    }
    if (this.hasAuthority('ROLE_PASSENGER')) {
      role += "(PASSAGEIRO) ";
    }
    if (this.hasAuthority('ROLE_DRIVER')) {
      role += "(MOTORISTA)";
    }

    return role;
  }

  public updateRoleToDriver(): void {
    this.userManagementService()
      .getByLogin(this.username)
      .then(res => {
        this.userAccount = res.data;
        this.userAccount.authorities = ['ROLE_USER', 'ROLE_DRIVER'];
        this.saveUser();
      });
  }

  public updateRoleToPassenger(): void {
    this.userManagementService()
      .getByLogin(this.username)
      .then(res => {
        this.userAccount = res.data;
        this.userAccount.authorities = ['ROLE_USER', 'ROLE_PASSENGER'];
        this.saveUser();
      });
  }

  public saveUser(): void {
    if (this.userAccount.id) {
      this.userManagementService()
        .update(this.userAccount)
        .then(res => {
          const message = "Perfil atualizado com sucesso!"
          this.$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
          this.accountService().retrieveAccount();
        })
        .catch(error => {
          this.alertService().showHttpError(this, error.response);
        });
    }
  }
}
