<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="vehicle">
        <h2 class="jh-entity-heading" data-cy="vehicleDetailsHeading">
          <span v-text="$t('hcpgatewayApp.reservationVehicle.detail.title')">Vehicle</span> {{ vehicle.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationVehicle.model')">Model</span>
          </dt>
          <dd>
            <span>{{ vehicle.model }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationVehicle.year')">Year</span>
          </dt>
          <dd>
            <span>{{ vehicle.year }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationVehicle.plate')">Plate</span>
          </dt>
          <dd>
            <span>{{ vehicle.plate }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationVehicle.driverLogin')">Driver Login</span>
          </dt>
          <dd>
            <span>{{ vehicle.driverLogin }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="vehicle.id" :to="{ name: 'VehicleEdit', params: { vehicleId: vehicle.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./vehicle-details.component.ts"></script>
