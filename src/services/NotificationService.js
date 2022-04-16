import NotificationApi from "@/api/NotificationApi"

export default {
    getNotifications() {
        return NotificationApi.getNotifications();
    },
    maskAsRead(notificationId) {
        return NotificationApi.maskAsRead(notificationId);
    }
}