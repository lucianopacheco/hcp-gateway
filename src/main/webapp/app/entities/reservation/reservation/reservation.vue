<template>
  <div>
    <h2 id="page-heading" data-cy="ReservationHeading">
      <span v-text="$t('hcpgatewayApp.reservationReservation.home.title')" id="reservation-heading">Reservations</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('hcpgatewayApp.reservationReservation.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ReservationCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-reservation"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('hcpgatewayApp.reservationReservation.home.createLabel')"> Create a new Reservation </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && reservations && reservations.length === 0">
      <span v-text="$t('hcpgatewayApp.reservationReservation.home.notFound')">No reservations found</span>
    </div>
    <div class="table-responsive" v-if="reservations && reservations.length > 0">
      <table class="table table-striped" aria-describedby="reservations">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('passengerLogin')">
              <span v-text="$t('hcpgatewayApp.reservationReservation.passengerLogin')">Passenger Login</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'passengerLogin'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('status')">
              <span v-text="$t('hcpgatewayApp.reservationReservation.status')">Status</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'status'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('createdAt')">
              <span v-text="$t('hcpgatewayApp.reservationReservation.createdAt')">Created At</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createdAt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('updatedAt')">
              <span v-text="$t('hcpgatewayApp.reservationReservation.updatedAt')">Updated At</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'updatedAt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('trip.id')">
              <span v-text="$t('hcpgatewayApp.reservationReservation.trip')">Trip</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'trip.id'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reservation in reservations" :key="reservation.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ReservationView', params: { reservationId: reservation.id } }">{{ reservation.id }}</router-link>
            </td>
            <td>{{ reservation.passengerLogin }}</td>
            <td><span :class="statusClass(reservation.status)" v-text="$t('hcpgatewayApp.ReservationStatus.' + reservation.status)">
              {{ reservation.status }}</span>
            </td>
            <td>{{ reservation.createdAt | formatDate }}</td>
            <td>{{ reservation.updatedAt | formatDate }}</td>
            <td>
              <div v-if="reservation.trip">
                <router-link :to="{ name: 'TripView', params: { tripId: reservation.trip.id } }">{{ reservation.trip.id }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ReservationView', params: { reservationId: reservation.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
               
                <b-button v-show="reservation.status == 'CONFIRMED'"
                  v-on:click="prepareRemove(reservation)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.cancel')">Cancel</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span
          id="hcpgatewayApp.reservationReservation.cancel.question"
          data-cy="reservationDeleteDialogHeading"
          v-text="$t('entity.cancel.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-reservation-heading" v-text="$t('hcpgatewayApp.reservationReservation.cancel.question', { id: removeId })">
          Are you sure you want to cancel this Reservation?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.no')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-cancel-reservation"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.yes')"
          v-on:click="removeReservation()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    <div v-show="reservations && reservations.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./reservation.component.ts"></script>
