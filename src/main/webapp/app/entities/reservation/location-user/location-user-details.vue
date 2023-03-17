<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="locationUser">
        <h2 class="jh-entity-heading" data-cy="locationUserDetailsHeading">
          <span v-text="$t('hcpgatewayApp.reservationLocationUser.detail.title')">LocationUser</span> {{ locationUser.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationLocationUser.login')">Login</span>
          </dt>
          <dd>
            <span>{{ locationUser.login }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationLocationUser.locationType')">Location Type</span>
          </dt>
          <dd>
            <span v-text="$t('hcpgatewayApp.LocationType.' + locationUser.locationType)">{{ locationUser.locationType }}</span>
          </dd>
          <dt>
            <span v-text="$t('hcpgatewayApp.reservationLocationUser.location')">Location</span>
          </dt>
          <dd>
            <div v-if="locationUser.location">
              <router-link :to="{ name: 'LocationView', params: { locationId: locationUser.location.id } }">{{
                locationUser.location.name
              }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link
          v-if="locationUser.id"
          :to="{ name: 'LocationUserEdit', params: { locationUserId: locationUser.id } }"
          custom
          v-slot="{ navigate }"
        >
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./location-user-details.component.ts"></script>
