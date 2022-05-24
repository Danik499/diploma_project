<template>
  <div>
    <div v-if="role == 'admin'">
      <admin-nav-bar />
    </div>
    <div v-else>
      <user-nav-bar />
    </div>
    <textarea class="notification-text" v-model="eventText"></textarea>
    <button class="send-btn" @click="send">Send</button>
  </div>
</template>

<script>
import AdminNavBar from "../components/AdminNavBar";
import UserNavBar from "../components/UserNavBar";
export default {
  components: {
    AdminNavBar,
    UserNavBar,
  },
  data() {
    return {
      eventText: "",
      role: localStorage.getItem("role"),
    };
  },
  methods: {
    async send() {
      try {
        if (this.eventText) {
          await this.$store.dispatch("sendNotification", {
            eventId: this.$route.params.id,
            notificationText: this.eventText,
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.notification-text {
  font-family: "Times New Roman", Times, serif;
  font-size: 18px;
  resize: vertical;
  margin-top: 10px;
  width: 100%;
  height: 100px;
  border: 2px solid black;
  border-radius: 5px;
}

.send-btn {
  margin-top: 5px;
  padding: 5px 10px;
  background: white;
  font-weight: 550;
  border-radius: 5px;
  cursor: pointer;
}

.send-btn:active {
  background: rgb(232, 232, 232);
}
</style>