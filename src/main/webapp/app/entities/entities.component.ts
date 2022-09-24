import { Component, Provide, Vue } from 'vue-property-decorator';

import UserService from '@/entities/user/user.service';
import CondominiumService from './reservation/condominium/condominium.service';
import LocationService from './reservation/location/location.service';
import VehicleService from './reservation/vehicle/vehicle.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

@Component
export default class Entities extends Vue {
  @Provide('userService') private userService = () => new UserService();
  @Provide('condominiumService') private condominiumService = () => new CondominiumService();
  @Provide('locationService') private locationService = () => new LocationService();
  @Provide('vehicleService') private vehicleService = () => new VehicleService();
  // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
}
