<template>
  <div>
    <user-nav-bar :key="'A' + rerenderKey" />
    <notifications-list :notifications="preparedArray" :key="rerenderKey" />
  </div>
</template>

<script>
import UserNavBar from "@/components/UserNavBar";
import NotificationsList from "@/components/NotificationsList";
import { mapGetters } from "vuex";
export default {
  components: {
    UserNavBar,
    NotificationsList,
  },
  data() {
    return {
      rerenderKey: 0,
      preparedArray: [],
    };
  },
  computed: mapGetters(["notifications", "rerender"]),
  async mounted() {
    await this.$store.dispatch("getUserNotifications");
    await this.$store.dispatch("readNotifications");
    let res = [];
    this.notifications.forEach((n, i) => {
      i % 2 == 0 ? res.push([n]) : res[res.length - 1].push(n);
    });
    this.preparedArray = res;
    console.log(res);
    navigator.serviceWorker.addEventListener("message", async () => {
      await this.$store.dispatch("readNotifications");
      this.rerenderKey++;
    });
  },
};
</script>

<style lang="css" scoped>
</style>