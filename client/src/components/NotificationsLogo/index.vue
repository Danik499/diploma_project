<template>
  <div class="notif-icon">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <button type="button" class="icon-button" @click="redirect">
      <span class="material-icons">notifications</span>
      <span class="icon-button__badge" v-if="unreadCount != 0">{{
        unreadCount
      }}</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unreadCount: "",
    };
  },
  methods: {
    redirect() {
      if (this.$route.path != "/user/history")
        this.$router.push("/user/history");
    },
  },
  async mounted() {
    const unreadCount = await this.$store.dispatch("getUserNotifications");
    this.unreadCount = unreadCount;
    try {
      navigator.serviceWorker.addEventListener("message", async () => {
        if (this.$route.path == "/user/history") {
          await this.$store.dispatch("readNotifications");
          this.unreadCount = 0;
        } else {
          const unreadCount = await this.$store.dispatch(
            "getUserNotifications"
          );
          this.unreadCount = unreadCount;
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
</script>

<style lang="css" scoped>
.notif-icon {
  display: inline-block;
  margin-right: 10px;
}

.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #333333;
  background: #dddddd;
  border: none;
  outline: none;
  border-radius: 50%;
}

.icon-button:hover {
  cursor: pointer;
}

.icon-button:active {
  background: #cccccc;
}

.icon-button__badge {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
  background: red;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>