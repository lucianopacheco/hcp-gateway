<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2 v-show="!vehicle.id"
          id="hcpgatewayApp.reservationVehicle.home.createLabel"
          data-cy="VehicleCreateUpdateHeading"
          v-text="$t('hcpgatewayApp.reservationVehicle.home.createLabel')"
        >
          Create Vehicle
        </h2>
         <h2 v-show="vehicle.id"
          id="hcpgatewayApp.reservationVehicle.home.editLabel"
          data-cy="VehicleCreateUpdateHeading"
          v-text="$t('hcpgatewayApp.reservationVehicle.home.editLabel')"
        >
          Edit Vehicle
        </h2>
        <div>
          <div class="form-group" v-if="vehicle.id" v-show="false">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="vehicle.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationVehicle.model')" for="vehicle-model">Model</label>
            <input
              type="text"
              class="form-control"
              name="model"
              id="vehicle-model"
              data-cy="model"
              :class="{ valid: !$v.vehicle.model.$invalid, invalid: $v.vehicle.model.$invalid }"
              v-model="$v.vehicle.model.$model"
              required
            />
            <div v-if="$v.vehicle.model.$anyDirty && $v.vehicle.model.$invalid">
              <small class="form-text text-danger" v-if="!$v.vehicle.model.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationVehicle.year')" for="vehicle-year">Year</label>
            <input
              type="number"
              class="form-control"
              name="year"
              id="vehicle-year"
              data-cy="year"
              :class="{ valid: !$v.vehicle.year.$invalid, invalid: $v.vehicle.year.$invalid }"
              v-model.number="$v.vehicle.year.$model"
              required
            />
            <div v-if="$v.vehicle.year.$anyDirty && $v.vehicle.year.$invalid">
              <small class="form-text text-danger" v-if="!$v.vehicle.year.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.vehicle.year.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationVehicle.plate')" for="vehicle-plate">Plate</label>
            <input
              type="text"
              class="form-control"
              name="plate"
              maxlength="7"
              id="vehicle-plate"
              data-cy="plate"
              :class="{ valid: !$v.vehicle.plate.$invalid, invalid: $v.vehicle.plate.$invalid }"
              v-model="$v.vehicle.plate.$model"
              required
            />
            <div v-if="$v.vehicle.plate.$anyDirty && $v.vehicle.plate.$invalid">
              <small class="form-text text-danger" v-if="!$v.vehicle.plate.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.vehicle.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./vehicle-update.component.ts"></script>
