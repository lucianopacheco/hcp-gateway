<template>
  <div>
    <h2 id="page-heading" data-cy="LocationHeading">
      <span v-text="$t('hcpgatewayApp.reservationLocation.home.title')" id="location-heading">Locations</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('hcpgatewayApp.reservationLocation.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'LocationCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-location"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('hcpgatewayApp.reservationLocation.home.createLabel')"> Create a new Location </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && locations && locations.length === 0">
      <span v-text="$t('hcpgatewayApp.reservationLocation.home.notFound')">No locations found</span>
    </div>
    <div class="table-responsive" v-if="locations && locations.length > 0">
      <table class="table table-striped" aria-describedby="locations">
        <thead>
          <tr>
            <th scope="row" v-on:click="changeOrder('id')">
              <span v-text="$t('global.field.id')">ID</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'id'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('name')">
              <span v-text="$t('hcpgatewayApp.reservationLocation.name')">Name</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'name'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('zipcode')">
              <span v-text="$t('hcpgatewayApp.reservationLocation.zipcode')">Zipcode</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'zipcode'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('address')">
              <span v-text="$t('hcpgatewayApp.reservationLocation.address')">Address</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'address'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('number')">
              <span v-text="$t('hcpgatewayApp.reservationLocation.number')">Number</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'number'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('city')">
              <span v-text="$t('hcpgatewayApp.reservationLocation.city')">City</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'city'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('state')">
              <span v-text="$t('hcpgatewayApp.reservationLocation.state')">State</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'state'"></jhi-sort-indicator>
            </th>
            <th scope="row" v-on:click="changeOrder('type')">
              <span v-text="$t('hcpgatewayApp.reservationLocation.type')">Type</span>
              <jhi-sort-indicator :current-order="propOrder" :reverse="reverse" :field-name="'type'"></jhi-sort-indicator>
            </th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="location in locations" :key="location.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'LocationView', params: { locationId: location.id } }">{{ location.id }}</router-link>
            </td>
            <td>{{ location.name }}</td>
            <td>{{ location.zipcode }}</td>
            <td>{{ location.address }}</td>
            <td>{{ location.number }}</td>
            <td>{{ location.city }}</td>
            <td>{{ location.state }}</td>
            <td v-text="$t('hcpgatewayApp.LocationType.' + location.type)">{{ location.type }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'LocationView', params: { locationId: location.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'LocationEdit', params: { locationId: location.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(location)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
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
          id="hcpgatewayApp.reservationLocation.delete.question"
          data-cy="locationDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-location-heading" v-text="$t('hcpgatewayApp.reservationLocation.delete.question', { id: removeId })">
          Are you sure you want to delete this Location?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-location"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeLocation()"
        >
          Delete
        </button>
      </div>
    </b-modal>
    
  </div>
</template>

<script lang="ts" src="./location.component.ts"></script>
