import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

// prettier-ignore
const Condominium = () => import('@/entities/reservation/condominium/condominium.vue');
// prettier-ignore
const CondominiumUpdate = () => import('@/entities/reservation/condominium/condominium-update.vue');
// prettier-ignore
const CondominiumDetails = () => import('@/entities/reservation/condominium/condominium-details.vue');
// prettier-ignore
const Location = () => import('@/entities/reservation/location/location.vue');
// prettier-ignore
const LocationUpdate = () => import('@/entities/reservation/location/location-update.vue');
// prettier-ignore
const LocationDetails = () => import('@/entities/reservation/location/location-details.vue');
// prettier-ignore
const Vehicle = () => import('@/entities/reservation/vehicle/vehicle.vue');
// prettier-ignore
const VehicleUpdate = () => import('@/entities/reservation/vehicle/vehicle-update.vue');
// prettier-ignore
const VehicleDetails = () => import('@/entities/reservation/vehicle/vehicle-details.vue');
// prettier-ignore
const Trip = () => import('@/entities/reservation/trip/trip.vue');
// prettier-ignore
const TripUpdate = () => import('@/entities/reservation/trip/trip-update.vue');
// prettier-ignore
const TripDetails = () => import('@/entities/reservation/trip/trip-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'condominium',
      name: 'Condominium',
      component: Condominium,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'condominium/new',
      name: 'CondominiumCreate',
      component: CondominiumUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'condominium/:condominiumId/edit',
      name: 'CondominiumEdit',
      component: CondominiumUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'condominium/:condominiumId/view',
      name: 'CondominiumView',
      component: CondominiumDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'location',
      name: 'Location',
      component: Location,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'location/new',
      name: 'LocationCreate',
      component: LocationUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'location/:locationId/edit',
      name: 'LocationEdit',
      component: LocationUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'location/:locationId/view',
      name: 'LocationView',
      component: LocationDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'vehicle',
      name: 'Vehicle',
      component: Vehicle,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'vehicle/new',
      name: 'VehicleCreate',
      component: VehicleUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'vehicle/:vehicleId/edit',
      name: 'VehicleEdit',
      component: VehicleUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'vehicle/:vehicleId/view',
      name: 'VehicleView',
      component: VehicleDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'trip',
      name: 'Trip',
      component: Trip,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'trip/new',
      name: 'TripCreate',
      component: TripUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'trip/:tripId/edit',
      name: 'TripEdit',
      component: TripUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'trip/:tripId/view',
      name: 'TripView',
      component: TripDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};