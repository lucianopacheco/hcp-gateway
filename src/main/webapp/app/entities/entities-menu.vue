<template>
  <div>
    <b-dropdown-item to="/location">
      <font-awesome-icon icon="location-dot" />
      <span v-text="$t('global.menu.entities.reservationLocation')">Location</span>
    </b-dropdown-item>
    <b-dropdown-item to="/vehicle" v-if="hasAuthority('ROLE_DRIVER') && authenticated">
      <font-awesome-icon icon="car" />
      <span v-text="$t('global.menu.entities.reservationVehicle')">Vehicle</span>
    </b-dropdown-item>
    <b-dropdown-item to="/trip" v-if="hasAuthority('ROLE_PASSENGER') && authenticated">
      <font-awesome-icon icon="arrows-left-right" />
      <span v-text="$t('global.menu.entities.reservationTrip')">Trip</span>
    </b-dropdown-item>
     <b-dropdown-item to="/trip-driver" v-if="hasAuthority('ROLE_DRIVER') && authenticated">
      <font-awesome-icon icon="arrows-left-right" />
      <span v-text="$t('global.menu.entities.reservationTripDriver')">Trip</span>
    </b-dropdown-item>
    <b-dropdown-item to="/reservation">
      <font-awesome-icon icon="check" />
      <span v-text="$t('global.menu.entities.reservationReservation')">Reservation</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
