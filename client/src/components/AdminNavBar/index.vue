<template>
  <div>
    <div class="navbar">
      <div></div>
      <div class="nav-links">
        <span>
          <router-link class="navbar-item" to="/admin/events"
            >Events</router-link
          > </span
        >&nbsp;
        <span>
          <router-link class="navbar-item" to="/admin/create"
            >Create</router-link
          > </span
        >&nbsp;
        <span @click="logout">
          <a class="navbar-item">Logout</a>
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

.navbar-item {
  color: black;
  text-decoration: none;
}

.navbar-item:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>