<template>
  <div>
    <div class="navbar">
      <div class="nav-links">
        <span>
          <router-link to="/user/search">Search</router-link>
        </span>
        <span>
          <router-link to="/user/my_events">My events</router-link>
        </span>
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
    }
  }
};
</script>

<style lang="css" scoped>
.navbar {
  width: 80%;
  margin: auto;
}

.nav-links {
  display: flex;
  justify-content: space-between;
  width: 30%;
  margin-left: auto;
  margin-right: 0;
}
</style>