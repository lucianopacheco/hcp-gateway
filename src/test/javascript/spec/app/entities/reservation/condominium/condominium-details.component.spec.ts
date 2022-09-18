/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import CondominiumDetailComponent from '@/entities/reservation/condominium/condominium-details.vue';
import CondominiumClass from '@/entities/reservation/condominium/condominium-details.component';
import CondominiumService from '@/entities/reservation/condominium/condominium.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Condominium Management Detail Component', () => {
    let wrapper: Wrapper<CondominiumClass>;
    let comp: CondominiumClass;
    let condominiumServiceStub: SinonStubbedInstance<CondominiumService>;

    beforeEach(() => {
      condominiumServiceStub = sinon.createStubInstance<CondominiumService>(CondominiumService);

      wrapper = shallowMount<CondominiumClass>(CondominiumDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { condominiumService: () => condominiumServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundCondominium = { id: 123 };
        condominiumServiceStub.find.resolves(foundCondominium);

        // WHEN
        comp.retrieveCondominium(123);
        await comp.$nextTick();

        // THEN
        expect(comp.condominium).toBe(foundCondominium);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCondominium = { id: 123 };
        condominiumServiceStub.find.resolves(foundCondominium);

        // WHEN
        comp.beforeRouteEnter({ params: { condominiumId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.condominium).toBe(foundCondominium);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
