/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import CondominiumUpdateComponent from '@/entities/reservation/condominium/condominium-update.vue';
import CondominiumClass from '@/entities/reservation/condominium/condominium-update.component';
import CondominiumService from '@/entities/reservation/condominium/condominium.service';

import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Condominium Management Update Component', () => {
    let wrapper: Wrapper<CondominiumClass>;
    let comp: CondominiumClass;
    let condominiumServiceStub: SinonStubbedInstance<CondominiumService>;

    beforeEach(() => {
      condominiumServiceStub = sinon.createStubInstance<CondominiumService>(CondominiumService);

      wrapper = shallowMount<CondominiumClass>(CondominiumUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          condominiumService: () => condominiumServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.condominium = entity;
        condominiumServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(condominiumServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.condominium = entity;
        condominiumServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(condominiumServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundCondominium = { id: 123 };
        condominiumServiceStub.find.resolves(foundCondominium);
        condominiumServiceStub.retrieve.resolves([foundCondominium]);

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
