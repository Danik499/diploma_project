<template>
  <div>
    <input type="email" placeholder="email" v-model="email" />
    <br />
    <input type="password" placeholder="password" v-model="password" />
    <br />
    <button @click="login">Submit</button>
    <p>
      or
      <router-link class="link" to="/registration">create new account</router-link>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: mapGetters(["role"]),
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        });
        this.$router.push("/" + this.role);
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
</script>

<style lang="css" scoped>
.link {
  text-decoration: none;
}
</style>