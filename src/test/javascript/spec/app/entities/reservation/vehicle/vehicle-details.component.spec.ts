/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import VehicleDetailComponent from '@/entities/reservation/vehicle/vehicle-details.vue';
import VehicleClass from '@/entities/reservation/vehicle/vehicle-details.component';
import VehicleService from '@/entities/reservation/vehicle/vehicle.service';
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
  describe('Vehicle Management Detail Component', () => {
    let wrapper: Wrapper<VehicleClass>;
    let comp: VehicleClass;
    let vehicleServiceStub: SinonStubbedInstance<VehicleService>;

    beforeEach(() => {
      vehicleServiceStub = sinon.createStubInstance<VehicleService>(VehicleService);

      wrapper = shallowMount<VehicleClass>(VehicleDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { vehicleService: () => vehicleServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundVehicle = { id: 123 };
        vehicleServiceStub.find.resolves(foundVehicle);

        // WHEN
        comp.retrieveVehicle(123);
        await comp.$nextTick();

        // THEN
        expect(comp.vehicle).toBe(foundVehicle);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundVehicle = { id: 123 };
        vehicleServiceStub.find.resolves(foundVehicle);

        // WHEN
        comp.beforeRouteEnter({ params: { vehicleId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.vehicle).toBe(foundVehicle);
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
