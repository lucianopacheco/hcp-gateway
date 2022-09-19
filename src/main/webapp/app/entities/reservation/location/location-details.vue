<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="location">
        <h2 class="jh-entity-heading" data-cy="locationDetailsHeading">
          <span v-text="$t('hcpgatewayApp.reservationLocation.detail.title')">Location</span> {{ location.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationLocation.name')">Name</span>
          </dt>
          <dd>
            <span>{{ location.name }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationLocation.zipcode')">Zipcode</span>
          </dt>
          <dd>
            <span>{{ location.zipcode }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationLocation.address')">Address</span>
          </dt>
          <dd>
            <span>{{ location.address }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationLocation.number')">Number</span>
          </dt>
          <dd>
            <span>{{ location.number }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationLocation.city')">City</span>
          </dt>
          <dd>
            <span>{{ location.city }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationLocation.state')">State</span>
          </dt>
          <dd>
            <span>{{ location.state }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationLocation.type')">Type</span>
          </dt>
          <dd>
            <span v-text="$t('hcpgatewayApp.LocationType.' + location.type)">{{ location.type }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="location.id" :to="{ name: 'LocationEdit', params: { locationId: location.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./location-details.component.ts"></script>
