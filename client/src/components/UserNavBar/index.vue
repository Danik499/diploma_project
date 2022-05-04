<template>
  <div>
    <div class="navbar">
      <div></div>
      <div class="nav-links">
        <form @submit.prevent="submitHandler" class="form">
          <input type="text" name="search" v-model="search" />
          <input type="submit" value="Search" />
        </form>
        &nbsp;
        <span>
          <router-link to="/user/my_subscriptions"
            >My subscriptions</router-link
          > </span
        >&nbsp;
        <span @click="logout">
          <a>Logout</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
    };
  },
  computed: mapGetters(["key"]),
  methods: {
    logout() {
      this.$router.push("/login");
      this.$store.dispatch("logout");
    },
    submitHandler() {
      if (this.search && this.$route.params.id != this.search) {
        this.$router.push("/user/search/" + this.search);
        this.rerender();
      }
    },
    ...mapMutations(["rerender"]),
  },
};
</script>

<style lang="css" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
}

.nav-links {
  float: right;
}

.form {
  display: inline;
}
</style>