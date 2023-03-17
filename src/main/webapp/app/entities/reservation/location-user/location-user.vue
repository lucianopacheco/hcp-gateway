<template>
  <div>
    <h2 id="page-heading" data-cy="LocationUserHeading">
      <span v-text="$t('hcpgatewayApp.reservationLocationUser.home.title')" id="location-user-heading">Location Users</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('hcpgatewayApp.reservationLocationUser.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'LocationUserCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-location-user"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('hcpgatewayApp.reservationLocationUser.home.createLabel')"> Create a new Location User </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && locationUsers && locationUsers.length === 0">
      <span v-text="$t('hcpgatewayApp.reservationLocationUser.home.notFound')">No locationUsers found</span>
    </div>
    <div class="table-responsive" v-if="locationUsers && locationUsers.length > 0">
      <table class="table table-striped" aria-describedby="locationUsers">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('hcpgatewayApp.reservationLocationUser.login')">Login</span></th>
            <th scope="row"><span v-text="$t('hcpgatewayApp.reservationLocationUser.locationType')">Location Type</span></th>
            <th scope="row"><span v-text="$t('hcpgatewayApp.reservationLocationUser.location')">Location</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="locationUser in locationUsers" :key="locationUser.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'LocationUserView', params: { locationUserId: locationUser.id } }">{{
                locationUser.id
              }}</router-link>
            </td>
            <td>{{ locationUser.login }}</td>
            <td v-text="$t('hcpgatewayApp.LocationType.' + locationUser.locationType)">{{ locationUser.locationType }}</td>
            <td>
              <div v-if="locationUser.location">
                <router-link :to="{ name: 'LocationView', params: { locationId: locationUser.location.id } }">{{
                  locationUser.location.name
                }}</router-link>
              </div>
            </td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'LocationUserView', params: { locationUserId: locationUser.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'LocationUserEdit', params: { locationUserId: locationUser.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(locationUser)"
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
          id="hcpgatewayApp.reservationLocationUser.delete.question"
          data-cy="locationUserDeleteDialogHeading"
          v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-locationUser-heading" v-text="$t('hcpgatewayApp.reservationLocationUser.delete.question', { id: removeId })">
          Are you sure you want to delete this Location User?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-locationUser"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeLocationUser()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./location-user.component.ts"></script>
