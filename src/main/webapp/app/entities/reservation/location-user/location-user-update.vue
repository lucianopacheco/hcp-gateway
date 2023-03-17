<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hcpgatewayApp.reservationLocationUser.home.createOrEditLabel"
          data-cy="LocationUserCreateUpdateHeading"
          v-text="$t('hcpgatewayApp.reservationLocationUser.home.createOrEditLabel')"
        >
          Create or edit a LocationUser
        </h2>
        <div>
          <div class="form-group" v-if="locationUser.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="locationUser.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationLocationUser.login')" for="location-user-login"
              >Login</label
            >
            <input
              type="text"
              class="form-control"
              name="login"
              id="location-user-login"
              data-cy="login"
              :class="{ valid: !$v.locationUser.login.$invalid, invalid: $v.locationUser.login.$invalid }"
              v-model="$v.locationUser.login.$model"
            />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('hcpgatewayApp.reservationLocationUser.locationType')"
              for="location-user-locationType"
              >Location Type</label
            >
            <select
              class="form-control"
              name="locationType"
              :class="{ valid: !$v.locationUser.locationType.$invalid, invalid: $v.locationUser.locationType.$invalid }"
              v-model="$v.locationUser.locationType.$model"
              id="location-user-locationType"
              data-cy="locationType"
            >
              <option
                v-for="locationType in locationTypeValues"
                :key="locationType"
                v-bind:value="locationType"
                v-bind:label="$t('hcpgatewayApp.LocationType.' + locationType)"
              >
                {{ locationType }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationLocationUser.location')" for="location-user-location"
              >Location</label
            >
            <select class="form-control" id="location-user-location" data-cy="location" name="location" v-model="locationUser.location">
              <option v-bind:value="null"></option>
              <option
                v-bind:value="
                  locationUser.location && locationOption.id === locationUser.location.id ? locationUser.location : locationOption
                "
                v-for="locationOption in locations"
                :key="locationOption.id"
              >
                {{ locationOption.name }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.locationUser.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./location-user-update.component.ts"></script>
