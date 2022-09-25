<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="reservation">
        <h2 class="jh-entity-heading" data-cy="reservationDetailsHeading">
          <span v-text="$t('hcpgatewayApp.reservationReservation.detail.title')">Reservation</span> {{ reservation.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationReservation.passengerLogin')">Passenger Login</span>
          </dt>
          <dd>
            <span>{{ reservation.passengerLogin }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationReservation.status')">Status</span>
          </dt>
          <dd>
            <span v-text="$t('hcpgatewayApp.ReservationStatus.' + reservation.status)">{{ reservation.status }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationReservation.createdAt')">Created At</span>
          </dt>
          <dd>
            <span v-if="reservation.createdAt">{{ $d(Date.parse(reservation.createdAt), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationReservation.updatedAt')">Updated At</span>
          </dt>
          <dd>
            <span v-if="reservation.updatedAt">{{ $d(Date.parse(reservation.updatedAt), 'long') }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationReservation.trip')">Trip</span>
          </dt>
          <dd>
            <div v-if="reservation.trip">
              <router-link :to="{ name: 'TripView', params: { tripId: reservation.trip.id } }">{{ reservation.trip.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="reservation.id"
          :to="{ name: 'ReservationEdit', params: { reservationId: reservation.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./reservation-details.component.ts"></script>
