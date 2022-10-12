<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hcpgatewayApp.reservationTrip.home.createOrEditLabel"
          data-cy="TripCreateUpdateHeading"
          v-text="$t('hcpgatewayApp.reservationTrip.home.createOrEditLabel')"
        >
          Create or edit a Trip
        </h2>
        <div>
          <div class="form-group" v-if="trip.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="trip.id" readonly />
          </div>
          
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationTrip.whenDateTime')" for="trip-whenDateTime"
              >When Date Time</label
            >
            <div class="d-flex">
              <input
                id="trip-whenDateTime"
                data-cy="whenDateTime"
                type="datetime-local"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                class="form-control"
                name="whenDateTime"
                :class="{ valid: !$v.trip.whenDateTime.$invalid, invalid: $v.trip.whenDateTime.$invalid }"
                required
                :value="convertDateTimeFromServer($v.trip.whenDateTime.$model)"
                @change="updateInstantField('whenDateTime', $event)"
              />
            </div>
            <div v-if="$v.trip.whenDateTime.$anyDirty && $v.trip.whenDateTime.$invalid">
              <small class="form-text text-danger" v-if="!$v.trip.whenDateTime.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.trip.whenDateTime.ZonedDateTimelocal"
                v-text="$t('entity.validation.ZonedDateTimelocal')"
              >
                This field should be a date and time.
              </small>
            </div>
          </div>
         
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationTrip.availableSeats')" for="trip-availableSeats"
              >Available Seats</label
            >
            <input
              type="number"
              class="form-control"
              name="availableSeats"
              id="trip-availableSeats"
              data-cy="availableSeats"
              :class="{ valid: !$v.trip.availableSeats.$invalid, invalid: $v.trip.availableSeats.$invalid }"
              v-model.number="$v.trip.availableSeats.$model"
              required
            />
            <div v-if="$v.trip.availableSeats.$anyDirty && $v.trip.availableSeats.$invalid">
              <small class="form-text text-danger" v-if="!$v.trip.availableSeats.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.trip.availableSeats.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationTrip.price')" for="trip-price">Price</label>
            <input
              type="number"
              class="form-control"
              name="price"
              id="trip-price"
              data-cy="price"
              :class="{ valid: !$v.trip.price.$invalid, invalid: $v.trip.price.$invalid }"
              v-model.number="$v.trip.price.$model"
              required
            />
            <div v-if="$v.trip.price.$anyDirty && $v.trip.price.$invalid">
              <small class="form-text text-danger" v-if="!$v.trip.price.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small class="form-text text-danger" v-if="!$v.trip.price.numeric" v-text="$t('entity.validation.number')">
                This field should be a number.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationTrip.meetingPoint')" for="trip-meetingPoint"
              >Meeting Point</label
            >
            <input
              type="text"
              class="form-control"
              name="meetingPoint"
              id="trip-meetingPoint"
              data-cy="meetingPoint"
              :class="{ valid: !$v.trip.meetingPoint.$invalid, invalid: $v.trip.meetingPoint.$invalid }"
              v-model="$v.trip.meetingPoint.$model"
            />
          </div>
          
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationTrip.vehicle')" for="trip-vehicle">Vehicle</label>
            <select class="form-control" id="trip-vehicle" data-cy="vehicle" name="vehicle" v-model="trip.vehicle" required>
              <option v-if="!trip.vehicle" v-bind:value="null" selected></option>
              <option
                v-bind:value="trip.vehicle && vehicleOption.id === trip.vehicle.id ? trip.vehicle : vehicleOption"
                v-for="vehicleOption in vehicles"
                :key="vehicleOption.id"
              >
                {{ vehicleOption.model }}
              </option>
            </select>
          </div>
          <div v-if="$v.trip.vehicle.$anyDirty && $v.trip.vehicle.$invalid">
            <small class="form-text text-danger" v-if="!$v.trip.vehicle.required" v-text="$t('entity.validation.required')">
              This field is required.
            </small>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationTrip.from')" for="trip-from">From</label>
            <select class="form-control" id="trip-from" data-cy="from" name="from" v-model="trip.from" required>
              <option v-if="!trip.from" v-bind:value="null" selected></option>
              <option
                v-bind:value="trip.from && locationOption.id === trip.from.id ? trip.from : locationOption"
                v-for="locationOption in locations"
                :key="locationOption.id"
              >
                {{ locationOption.name }}
              </option>
            </select>
          </div>
          <div v-if="$v.trip.from.$anyDirty && $v.trip.from.$invalid">
            <small class="form-text text-danger" v-if="!$v.trip.from.required" v-text="$t('entity.validation.required')">
              This field is required.
            </small>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationTrip.to')" for="trip-to">To</label>
            <select class="form-control" id="trip-to" data-cy="to" name="to" v-model="trip.to" required>
              <option v-if="!trip.to" v-bind:value="null" selected></option>
              <option
                v-bind:value="trip.to && locationOption.id === trip.to.id ? trip.to : locationOption"
                v-for="locationOption in locations"
                :key="locationOption.id"
              >
                {{ locationOption.name }}
              </option>
            </select>
          </div>
          <div v-if="$v.trip.to.$anyDirty && $v.trip.to.$invalid">
            <small class="form-text text-danger" v-if="!$v.trip.to.required" v-text="$t('entity.validation.required')">
              This field is required.
            </small>
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
            :disabled="$v.trip.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./trip-update.component.ts"></script>
