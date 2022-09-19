<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hcpgatewayApp.reservationLocation.home.createOrEditLabel"
          data-cy="LocationCreateUpdateHeading"
          v-text="$t('hcpgatewayApp.reservationLocation.home.createOrEditLabel')"
        >
          Create or edit a Location
        </h2>
        <div>
          <div class="form-group" v-if="location.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="location.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationLocation.name')" for="location-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="location-name"
              data-cy="name"
              :class="{ valid: !$v.location.name.$invalid, invalid: $v.location.name.$invalid }"
              v-model="$v.location.name.$model"
              required
            />
            <div v-if="$v.location.name.$anyDirty && $v.location.name.$invalid">
              <small class="form-text text-danger" v-if="!$v.location.name.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationLocation.zipcode')" for="location-zipcode"
              >Zipcode</label
            >
            <input
              type="text"
              class="form-control"
              name="zipcode"
              id="location-zipcode"
              data-cy="zipcode"
              :class="{ valid: !$v.location.zipcode.$invalid, invalid: $v.location.zipcode.$invalid }"
              v-model="$v.location.zipcode.$model"
              required
            />
            <div v-if="$v.location.zipcode.$anyDirty && $v.location.zipcode.$invalid">
              <small class="form-text text-danger" v-if="!$v.location.zipcode.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationLocation.address')" for="location-address"
              >Address</label
            >
            <input
              type="text"
              class="form-control"
              name="address"
              id="location-address"
              data-cy="address"
              :class="{ valid: !$v.location.address.$invalid, invalid: $v.location.address.$invalid }"
              v-model="$v.location.address.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationLocation.number')" for="location-number">Number</label>
            <input
              type="text"
              class="form-control"
              name="number"
              id="location-number"
              data-cy="number"
              :class="{ valid: !$v.location.number.$invalid, invalid: $v.location.number.$invalid }"
              v-model="$v.location.number.$model"
              required
            />
            <div v-if="$v.location.number.$anyDirty && $v.location.number.$invalid">
              <small class="form-text text-danger" v-if="!$v.location.number.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationLocation.city')" for="location-city">City</label>
            <input
              type="text"
              class="form-control"
              name="city"
              id="location-city"
              data-cy="city"
              :class="{ valid: !$v.location.city.$invalid, invalid: $v.location.city.$invalid }"
              v-model="$v.location.city.$model"
              required
            />
            <div v-if="$v.location.city.$anyDirty && $v.location.city.$invalid">
              <small class="form-text text-danger" v-if="!$v.location.city.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationLocation.state')" for="location-state">State</label>
            <input
              type="text"
              class="form-control"
              name="state"
              id="location-state"
              data-cy="state"
              :class="{ valid: !$v.location.state.$invalid, invalid: $v.location.state.$invalid }"
              v-model="$v.location.state.$model"
              required
            />
            <div v-if="$v.location.state.$anyDirty && $v.location.state.$invalid">
              <small class="form-text text-danger" v-if="!$v.location.state.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationLocation.type')" for="location-type">Type</label>
            <select
              class="form-control"
              name="type"
              :class="{ valid: !$v.location.type.$invalid, invalid: $v.location.type.$invalid }"
              v-model="$v.location.type.$model"
              id="location-type"
              data-cy="type"
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
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.location.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./location-update.component.ts"></script>
