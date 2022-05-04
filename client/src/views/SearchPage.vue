<template>
  <div>
    <user-nav-bar />
    <p v-if="found">
      Searching results for
      <b>{{ search }}</b>
    </p>
    <p v-else>There are no events on your request</p>
    <searched-events :events="events" />
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
      search: "",
      found: false,
    };
  },
  computed: mapGetters(["events", "key"]),
  watch: {
    key() {
      this.init();
    },
  },
  async mounted() {
    this.init();
  },
  methods: {
    async init() {
      try {
        let search = this.$route.params.id;
        this.search = search;
        await this.$store.dispatch("searchEvents", search);
        if (this.events[0]) this.found = true;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>

<style lang="css" scoped>
</style>