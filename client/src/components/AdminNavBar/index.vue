<template>
  <div>
    <div class="navbar">
      <div></div>
      <div class="nav-links">
        <span>
          <router-link to="/admin/events">Events</router-link> </span
        >&nbsp;
        <span>
          <router-link to="/admin/create">Create</router-link> </span
        >&nbsp;
        <span @click="logout">
          <a>Logout</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push("/login");
    },
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
</style>