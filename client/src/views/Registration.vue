<template>
  <div class="form">
    <form @submit.prevent="register">
      <input class="form-input" type="name" placeholder="name" v-model="name" />
      <br />
      <input
        class="form-input"
        type="email"
        placeholder="email"
        v-model="email"
      />
      <br />
      <input
        class="form-input"
        type="password"
        placeholder="password"
        v-model="password"
      />
      <br />
      <p>{{ error }}</p>
      <button class="submit-btn" type="submit">Submit</button>
    </form>
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
      errorMessage: "",
    };
  },
  computed: mapGetters(["role", "error"]),
  methods: {
    async register() {
      if (!this.email || !this.password || !this.name) {
        this.$store.dispatch("buildError", "All fields must be filled");
        return;
      }
      try {
        await this.$store.dispatch("registration", {
          name: this.name,
          email: this.email,
          password: this.password,
        });
        if (!this.error) this.$router.push("/" + this.role);
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  mounted() {
    this.$store.dispatch("buildError", null);
  },
};
</script>

<style lang="css" scoped>
.link {
  text-decoration: none;
}

.form-input {
  width: 100%;
  margin-top: 5px;
  padding: 6px 10px;
  border: 1px black solid;
  border-radius: 4px;
  font-size: 15px;
}

.submit-btn {
  margin-top: 5px;
  padding: 5px 10px;
  background: white;
  border-radius: 5px;
  cursor: pointer;
}

.form {
  width: 33%;
  text-align: center;
  margin: 0 auto;
  margin-top: 10%;
}
</style>