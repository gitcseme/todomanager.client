import NotificationApi from "@/api/NotificationApi"

export default {
    getNotifications() {
        return NotificationApi.getNotifications();
    }
}