<template>
  <div>
    <user-nav-bar />
    <searched-events :events="events" :key="rerender" />
  </div>
</template>

<script>
import UserNavBar from "@/components/UserNavBar";
import SearchedEvents from "@/components/SearchedEvents";
import { mapGetters } from "vuex";
export default {
  components: {
    UserNavBar,
    SearchedEvents,
  },
  data() {
    return {
      rerender: 0,
    };
  },
  computed: mapGetters(["events"]),
  async mounted() {
    try {
      await this.$store.dispatch("getSubscriptions");
      this.rerender += 1;
    } catch (error) {
      throw new Error(error);
    }
  },
};
</script>

<style lang="css" scoped>
</style>