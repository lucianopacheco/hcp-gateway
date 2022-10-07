<template>
  <div>
    <h2 id="page-heading" data-cy="TripHeading">
      <span v-text="$t('hcpgatewayApp.reservationTrip.home.title')" id="trip-heading">Trips</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('hcpgatewayApp.reservationTrip.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'TripCreate' }" custom v-slot="{ navigate }">
          <button @click="navigate" id="jh-create-entity" data-cy="entityCreateButton" class="btn btn-primary jh-create-entity create-trip">
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('hcpgatewayApp.reservationTrip.home.createLabel')"> Create a new Trip </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && trips && trips.length === 0">
      <span v-text="$t('hcpgatewayApp.reservationTrip.home.notFound')">No trips found</span>
    </div>
    <div class="table-responsive" v-if="trips && trips.length > 0">
      <table class="table table-striped" aria-describedby="trips">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('driverLogin')">
              <span v-text="$t('hcpgatewayApp.reservationTrip.driverLogin')">Driver Login</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'driverLogin'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('whenDateTime')">
              <span v-text="$t('hcpgatewayApp.reservationTrip.whenDateTime')">When Date Time</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'whenDateTime'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('destinationType')">
              <span v-text="$t('hcpgatewayApp.reservationTrip.destinationType')">Destination Type</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'destinationType'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('availableSeats')">
              <span v-text="$t('hcpgatewayApp.reservationTrip.availableSeats')">Available Seats</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'availableSeats'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('price')">
              <span v-text="$t('hcpgatewayApp.reservationTrip.price')">Price</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'price'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('meetingPoint')">
              <span v-text="$t('hcpgatewayApp.reservationTrip.meetingPoint')">Meeting Point</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'meetingPoint'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('createdAt')">
              <span v-text="$t('hcpgatewayApp.reservationTrip.createdAt')">Created At</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'createdAt'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('vehicle.model')">
              <span v-text="$t('hcpgatewayApp.reservationTrip.vehicle')">Vehicle</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'vehicle.model'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('from.name')">
              <span v-text="$t('hcpgatewayApp.reservationTrip.from')">From</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'from.name'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('to.name')">
              <span v-text="$t('hcpgatewayApp.reservationTrip.to')">To</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'to.name'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="trip in trips" :key="trip.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'TripView', params: { tripId: trip.id } }">{{ trip.id }}</router-link>
            </td>
            <td>{{ trip.driverLogin }}</td>
            <td>{{ trip.whenDateTime ? $d(Date.parse(trip.whenDateTime), 'short') : '' }}</td>
            <td v-text="$t('hcpgatewayApp.LocationType.' + trip.destinationType)">{{ trip.destinationType }}</td>
            <td>{{ trip.availableSeats }}</td>
            <td>{{ trip.price }}</td>
            <td>{{ trip.meetingPoint }}</td>
            <td>{{ trip.createdAt ? $d(Date.parse(trip.createdAt), 'short') : '' }}</td>
            <td>
              <div v-if="trip.vehicle">
                <router-link :to="{ name: 'VehicleView', params: { vehicleId: trip.vehicle.id } }">{{ trip.vehicle.model }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="trip.from">
                <router-link :to="{ name: 'LocationView', params: { locationId: trip.from.id } }">{{ trip.from.name }}</router-link>
              </div>
            </td>
            <td>
              <div v-if="trip.to">
                <router-link :to="{ name: 'LocationView', params: { locationId: trip.to.id } }">{{ trip.to.name }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'TripView', params: { tripId: trip.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'TripEdit', params: { tripId: trip.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(trip)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
                <b-button
                  v-on:click="prepareReservation(trip)"
                  variant="success"
                  class="btn btn-sm"
                  data-cy="entityReservationButton"
                  v-b-modal.reserveEntity
                >
                  <font-awesome-icon icon="lock"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.reserve')">Reserve</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="hcpgatewayApp.reservationTrip.delete.question" data-cy="tripDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-trip-heading" v-text="$t('hcpgatewayApp.reservationTrip.delete.question', { id: removeId })">
          Are you sure you want to delete this Trip?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-trip"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeTrip()"
        >
          Delete
        </button>
      </div>
    </b-modal>

    <b-modal ref="reserveEntity" id="reserveEntity">
      <span slot="modal-title"
        ><span id="hcpgatewayApp.reservationTrip.reserve.question" data-cy="tripReserveDialogHeading" v-text="$t('entity.reserve.title')"
          >Confirm reserve operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-trip-heading" v-text="$t('hcpgatewayApp.reservationTrip.reserve.question')">
          Are you sure you want to reserve this Trip?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeReserveDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-reserve-trip"
          data-cy="entityConfirmReserveButton"
          v-text="$t('entity.action.reserve')"
          v-on:click="reserveTrip()"
        >
          Reserve
        </button>
      </div>
    </b-modal>
    <div v-show="trips && trips.length > 0">
      <div class="row justify-content-center">
        <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
      </div>
      <div class="row justify-content-center">
        <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./trip.component.ts"></script>
