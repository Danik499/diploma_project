<template>
  <div>
    <admin-nav-bar />
    <events-list :events="events" />
  </div>
</template>

<script>
import AdminNavBar from "../components/AdminNavBar";
import EventsList from "../components/EventsList";
import { mapGetters } from "vuex";
export default {
  components: {
    AdminNavBar,
    EventsList
  },
  computed: mapGetters(["events"]),
  async mounted() {
    try {
      await this.$store.dispatch("loadEvents");
    } catch (error) {
      throw new Error(error);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>