<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="hcpgatewayApp.reservationReservation.home.createOrEditLabel"
          data-cy="ReservationCreateUpdateHeading"
          v-text="$t('hcpgatewayApp.reservationReservation.home.createOrEditLabel')"
        >
          Create or edit a Reservation
        </h2>
        <div>
          <div class="form-group" v-if="reservation.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="reservation.id" readonly />
          </div>
          <div class="form-group">
            <label
              class="form-control-label"
              v-text="$t('hcpgatewayApp.reservationReservation.passengerLogin')"
              for="reservation-passengerLogin"
              >Passenger Login</label
            >
            <input
              type="text"
              class="form-control"
              name="passengerLogin"
              id="reservation-passengerLogin"
              data-cy="passengerLogin"
              :class="{ valid: !$v.reservation.passengerLogin.$invalid, invalid: $v.reservation.passengerLogin.$invalid }"
              v-model="$v.reservation.passengerLogin.$model"
              required
            />
            <div v-if="$v.reservation.passengerLogin.$anyDirty && $v.reservation.passengerLogin.$invalid">
              <small class="form-text text-danger" v-if="!$v.reservation.passengerLogin.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationReservation.status')" for="reservation-status"
              >Status</label
            >
            <select
              class="form-control"
              name="status"
              :class="{ valid: !$v.reservation.status.$invalid, invalid: $v.reservation.status.$invalid }"
              v-model="$v.reservation.status.$model"
              id="reservation-status"
              data-cy="status"
              required
            >
              <option
                v-for="reservationStatus in reservationStatusValues"
                :key="reservationStatus"
                v-bind:value="reservationStatus"
                v-bind:label="$t('hcpgatewayApp.ReservationStatus.' + reservationStatus)"
              >
                {{ reservationStatus }}
              </option>
            </select>
            <div v-if="$v.reservation.status.$anyDirty && $v.reservation.status.$invalid">
              <small class="form-text text-danger" v-if="!$v.reservation.status.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationReservation.createdAt')" for="reservation-createdAt"
              >Created At</label
            >
            <div class="d-flex">
              <input
                id="reservation-createdAt"
                data-cy="createdAt"
                type="datetime-local"
                class="form-control"
                name="createdAt"
                :class="{ valid: !$v.reservation.createdAt.$invalid, invalid: $v.reservation.createdAt.$invalid }"
                required
                :value="convertDateTimeFromServer($v.reservation.createdAt.$model)"
                @change="updateInstantField('createdAt', $event)"
              />
            </div>
            <div v-if="$v.reservation.createdAt.$anyDirty && $v.reservation.createdAt.$invalid">
              <small class="form-text text-danger" v-if="!$v.reservation.createdAt.required" v-text="$t('entity.validation.required')">
                This field is required.
              </small>
              <small
                class="form-text text-danger"
                v-if="!$v.reservation.createdAt.ZonedDateTimelocal"
                v-text="$t('entity.validation.ZonedDateTimelocal')"
              >
                This field should be a date and time.
              </small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationReservation.updatedAt')" for="reservation-updatedAt"
              >Updated At</label
            >
            <div class="d-flex">
              <input
                id="reservation-updatedAt"
                data-cy="updatedAt"
                type="datetime-local"
                class="form-control"
                name="updatedAt"
                :class="{ valid: !$v.reservation.updatedAt.$invalid, invalid: $v.reservation.updatedAt.$invalid }"
                :value="convertDateTimeFromServer($v.reservation.updatedAt.$model)"
                @change="updateInstantField('updatedAt', $event)"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('hcpgatewayApp.reservationReservation.trip')" for="reservation-trip">Trip</label>
            <select class="form-control" id="reservation-trip" data-cy="trip" name="trip" v-model="reservation.trip" required>
              <option v-if="!reservation.trip" v-bind:value="null" selected></option>
              <option
                v-bind:value="reservation.trip && tripOption.id === reservation.trip.id ? reservation.trip : tripOption"
                v-for="tripOption in trips"
                :key="tripOption.id"
              >
                {{ tripOption.id }}
              </option>
            </select>
          </div>
          <div v-if="$v.reservation.trip.$anyDirty && $v.reservation.trip.$invalid">
            <small class="form-text text-danger" v-if="!$v.reservation.trip.required" v-text="$t('entity.validation.required')">
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
            :disabled="$v.reservation.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./reservation-update.component.ts"></script>
