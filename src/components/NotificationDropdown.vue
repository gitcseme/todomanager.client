<template>
  <div style="margin-left: 2px">
    <b-dropdown right size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
      <template #button-content>
        <b-icon icon="bell"></b-icon>
        <span style="color: red">{{ notifications.length }}</span>
      </template>

      <b-dropdown-item
        v-for="notification in notifications" :key="notification.id"
        style="width: 400px"
      >
        <p :class="{ 'seen-notification': notification.isSeen }">{{ notification.message }}</p>
      </b-dropdown-item>
      
    </b-dropdown>
  </div>
</template>

<script>
import NotificationService from '@/services/NotificationService';

export default {
  data() {
    return {
      notifications: []
    }
  },
  mounted() {
    this.loadNotifications();
  },
  methods: {
    loadNotifications() {
      NotificationService.getNotifications().then(response => {
        this.notifications = response;
      });
    },
  }
}
</script>

<style>
.seen-notification {
  color: lightgray;
}
</style>