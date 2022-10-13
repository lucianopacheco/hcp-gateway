<template>
  <div>
    <h2 id="page-heading" data-cy="VehicleHeading">
      <span v-text="$t('hcpgatewayApp.reservationVehicle.home.title')" id="vehicle-heading">Vehicles</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('hcpgatewayApp.reservationVehicle.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'VehicleCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-vehicle"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('hcpgatewayApp.reservationVehicle.home.createLabel')"> Create a new Vehicle </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && vehicles && vehicles.length === 0">
      <span v-text="$t('hcpgatewayApp.reservationVehicle.home.notFound')">No vehicles found</span>
    </div>
    <div class="table-responsive" v-if="vehicles && vehicles.length > 0">
      <table class="table table-striped" aria-describedby="vehicles">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('hcpgatewayApp.reservationVehicle.model')">Model</span></th>
            <th scope="row"><span v-text="$t('hcpgatewayApp.reservationVehicle.year')">Year</span></th>
            <th scope="row"><span v-text="$t('hcpgatewayApp.reservationVehicle.plate')">Plate</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehicle in vehicles" :key="vehicle.id" data-cy="entityTable">
            <td v-show="false">
              <router-link :to="{ name: 'VehicleView', params: { vehicleId: vehicle.id } }">{{ vehicle.id }}</router-link>
            </td>
            <td>{{ vehicle.model }}</td>
            <td>{{ vehicle.year }}</td>
            <td>{{ vehicle.plate }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'VehicleView', params: { vehicleId: vehicle.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'VehicleEdit', params: { vehicleId: vehicle.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(vehicle)"
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
        ><span id="hcpgatewayApp.reservationVehicle.delete.question" data-cy="vehicleDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-vehicle-heading" v-text="$t('hcpgatewayApp.reservationVehicle.delete.question', { id: removeId })">
          Are you sure you want to delete this Vehicle?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-vehicle"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeVehicle()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./vehicle.component.ts"></script>
