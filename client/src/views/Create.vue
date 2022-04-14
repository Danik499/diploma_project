<template>
  <div>
    <admin-nav-bar />
    <input type="text" placeholder="name" v-model="name" />
    <br />
    <button @click="create">Create</button>
  </div>
</template>

<script>
import AdminNavBar from "../components/AdminNavBar";
import { mapGetters } from "vuex";

export default {
  components: {
    AdminNavBar
  },
  data() {
    return {
      name: ""
    };
  },
  computed: mapGetters(["eventId"]),
  methods: {
    async create() {
      try {
        await this.$store.dispatch("create", {
          name: this.name
        });

        this.$router.push(`/event/${this.eventId}`);
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>