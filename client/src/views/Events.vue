<template>
  <div>
    <admin-nav-bar />
    <events-list :events="events" @rerender="rerender" :key="key" />
  </div>
</template>

<script>
import AdminNavBar from "../components/AdminNavBar";
import EventsList from "../components/EventsList";
import { mapGetters } from "vuex";
export default {
  components: {
    AdminNavBar,
    EventsList,
  },
  data() {
    return {
      key: 0,
    };
  },
  computed: mapGetters(["events"]),
  async mounted() {
    try {
      await this.$store.dispatch("loadEvents");
    } catch (error) {
      throw new Error(error);
    }
  },
  methods: {
    async rerender() {
      this.key++;
      await this.$store.dispatch("loadEvents");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>