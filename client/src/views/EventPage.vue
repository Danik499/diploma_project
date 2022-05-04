<template>
  <div>
    <div v-if="role == 'admin'">
      <admin-nav-bar />
    </div>
    <div v-else>
      <user-nav-bar />
    </div>
    <textarea v-model="eventText"></textarea>
    <button @click="send">Send</button>
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
        await this.$store.dispatch("sendNotification", {
          eventId: this.$route.params.id,
          notificationText: this.eventText,
        });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>

<style lang="css" scoped>
</style>