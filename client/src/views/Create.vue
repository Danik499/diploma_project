<template>
  <div>
    <admin-nav-bar />
    <form class="create-form" @submit.prevent="create">
      <input class="create-inp" type="text" placeholder="name" v-model="name" />
      <br />
      <button class="create-btn" type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import AdminNavBar from "../components/AdminNavBar";
import { mapGetters } from "vuex";

export default {
  components: {
    AdminNavBar,
  },
  data() {
    return {
      name: "",
    };
  },
  computed: mapGetters(["eventId"]),
  methods: {
    async create() {
      try {
        await this.$store.dispatch("create", {
          name: this.name,
        });

        this.$router.push(`/event/${this.eventId}`);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.create-form {
  margin-top: 10px;
}

.create-inp {
  width: 100%;
  /* font-family: "Times New Roman", Times, serif; */
  font-size: 16px;
  height: 25px;
  border: 1px solid black;
  border-radius: 5px;
}

.create-inp:active {
  border: 2px solid black;
}

.create-btn {
  margin-top: 5px;
  padding: 5px 10px;
  background: white;
  border-radius: 5px;
  cursor: pointer;
}
</style>