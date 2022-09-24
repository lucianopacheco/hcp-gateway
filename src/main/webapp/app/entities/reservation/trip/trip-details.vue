<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="trip">
        <h2 class="jh-entity-heading" data-cy="tripDetailsHeading">
          <span v-text="$t('hcpgatewayApp.reservationTrip.detail.title')">Trip</span> {{ trip.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationTrip.driverLogin')">Driver Login</span>
          </dt>
          <dd>
            <span>{{ trip.driverLogin }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationTrip.whenDateTime')">When Date Time</span>
          </dt>
          <dd>
            <span v-if="trip.whenDateTime">{{ $d(Date.parse(trip.whenDateTime), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationTrip.destinationType')">Destination Type</span>
          </dt>
          <dd>
            <span v-text="$t('hcpgatewayApp.LocationType.' + trip.destinationType)">{{ trip.destinationType }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationTrip.availableSeats')">Available Seats</span>
          </dt>
          <dd>
            <span>{{ trip.availableSeats }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationTrip.price')">Price</span>
          </dt>
          <dd>
            <span>{{ trip.price }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationTrip.meetingPoint')">Meeting Point</span>
          </dt>
          <dd>
            <span>{{ trip.meetingPoint }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationTrip.createdAt')">Created At</span>
          </dt>
          <dd>
            <span v-if="trip.createdAt">{{ $d(Date.parse(trip.createdAt), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationTrip.vehicle')">Vehicle</span>
          </dt>
          <dd>
            <div v-if="trip.vehicle">
              <router-link :to="{ name: 'VehicleView', params: { vehicleId: trip.vehicle.id } }">{{ trip.vehicle.model }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationTrip.from')">From</span>
          </dt>
          <dd>
            <div v-if="trip.from">
              <router-link :to="{ name: 'LocationView', params: { locationId: trip.from.id } }">{{ trip.from.name }}</router-link>
            </div>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationTrip.to')">To</span>
          </dt>
          <dd>
            <div v-if="trip.to">
              <router-link :to="{ name: 'LocationView', params: { locationId: trip.to.id } }">{{ trip.to.name }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="trip.id" :to="{ name: 'TripEdit', params: { tripId: trip.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./trip-details.component.ts"></script>
