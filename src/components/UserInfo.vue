<template>
  <div v-if="!!loggedInUser" class="user-info">
    <b-button @click="onLogout" variant="outline-info" class="mb-2">
      <b-icon icon="power" aria-hidden="true"></b-icon> Logout
    </b-button>
  </div>
</template>

<script>
import AccountService from '@/services/AccountService';

export default {
  data() {
    return {
      loggedInUser: null,
    }
  },
  mounted() {
    this.loadUserInfo();
  },
  methods: {
    loadUserInfo() {
      AccountService.getUserInfo().then(response => {
        this.loggedInUser = response;
      })
      .catch(error => {
        console.log(error);
      });
    },
    onLogout() {
      AccountService.signout().then(response => {
        // nevigate to signin page
        this.$router.push({ name: 'signin' });
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style>
  .user-info{
    margin-right: 2px;
  }
</style>