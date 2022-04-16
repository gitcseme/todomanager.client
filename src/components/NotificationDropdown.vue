<template>
  <div style="margin-left: 2px">
    <b-dropdown right size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
      <template #button-content>
        <b-icon icon="bell"></b-icon>
        <span style="color: red">{{ notificationsCount }}</span>
      </template>

      <b-dropdown-item
        v-for="notification in notifications" :key="notification.id"
        style="width: 400px"
        @click="openNotificationDetails(notification)"
      >
        <p :class="{ 'seen-notification': notification.isSeen }">
          {{ notification.message }} for todo id: {{ notification.todoId }}
        </p>
      </b-dropdown-item>
    </b-dropdown>

    <!-- open notification details -->
    <b-modal 
      id="modal-1" 
      ref="details_modal" 
      title="Notification deails"
      okOnly
      :hide-header-close="true"
      size="lg"
    >
      <div 
        v-if="!!todo"
        class="card"
      >
        <div class="card-body">
          <div class="row">
            <label>Todo id: <span>{{ todo.id }}</span></label>
            <label>Completed: <span>{{ todo.isDone ? 'Yes' : 'No' }}</span></label>
            <label>Crated on: <span>{{ todo.createdOn }}</span></label>
            <label>Updated on: <span>{{ todo.updatedOn }}</span></label>
            <label>Deadline: <span>{{ todo.deadline}}</span></label>
          </div>
          <hr>
          <div class="row">
            <p>{{ todo.description }}</p>
          </div>
        </div>  
      </div>
      <div v-else>
        <p>Source is deleted</p>
      </div>
    </b-modal>
  </div>
</template>

<script>
import NotificationService from '@/services/NotificationService';
import TodoService from '@/services/TodoService';

export default {
  data() {
    return {
      notifications: [],
      todo: null,
    }
  },
  mounted() {
    this.loadNotifications();
  },
  computed: {
    notificationsCount() {
      return this.notifications.filter(notification => !notification.isSeen).length;
    }
  },
  methods: {
    loadNotifications() {
      NotificationService.getNotifications().then(response => {
        this.notifications = response;
      });
    },
    markAsRead(notification) {
      if (notification.isSeen) 
        return;
      
      NotificationService.maskAsRead(notification.id).then(response => {
        this.loadNotifications();
      });
    },
    openNotificationDetails(notification) {
      TodoService.getTodo(notification.todoId).then(response => {
        console.log('get-todo: ', response);
        this.todo = response;
        this.markAsRead(notification);
        this.$refs.details_modal.show();
      })
      .catch(error => {
        this.todo = null;
        console.log(error);
        this.markAsRead(notification);
        this.$refs.details_modal.show();
      });

    }
  }
}
</script>

<style>
.seen-notification {
  color: lightgray;
}
</style>