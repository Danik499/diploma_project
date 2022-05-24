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
          <router-link class="navbar-item" to="/user/my_subscriptions"
            >My subscriptions</router-link
          > </span
        >&nbsp;
        <notifications-logo />
        <span @click="logout">
          <a class="navbar-item">Logout</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationsLogo from "@/components/NotificationsLogo";
import { mapMutations, mapGetters } from "vuex";
export default {
  components: {
    NotificationsLogo,
  },
  data() {
    return {
      search: "",
      unreadCount: "",
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
  async mounted() {},
};
</script>

<style lang="css" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.nav-links {
  float: right;
  display: flex;
  align-items: center;
}

.form {
  display: inline;
}

.navbar-item {
  color: black;
  text-decoration: none;
}

.navbar-item:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>