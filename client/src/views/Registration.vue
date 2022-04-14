<template>
  <div>
    <input type="name" placeholder="name" v-model="name" />
    <br />
    <input type="email" placeholder="email" v-model="email" />
    <br />
    <input type="password" placeholder="password" v-model="password" />
    <br />
    <button @click="register">Submit</button>
    <p>
      Already have an account?
      <router-link class="link" to="/login">Log in</router-link>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      errorMessage: ""
    };
  },
  computed: mapGetters(["role"]),
  methods: {
    async register() {
      try {
        await this.$store.dispatch("registration", {
          name: this.name,
          email: this.email,
          password: this.password
        });
        this.$router.push("/" + this.role);
      } catch (e) {
        throw new Error(e);
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