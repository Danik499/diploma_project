<template>
  <div class="form">
    <form @submit.prevent="login">
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
      or
      <router-link class="link" to="/registration"
        >create new account</router-link
      >
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
    };
  },
  computed: mapGetters(["role", "error"]),
  methods: {
    async login() {
      if (!this.email || !this.password) {
        this.$store.dispatch("buildError", "All fields must be filled");
        return;
      }
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
        if (!this.error) this.$router.push("/" + this.role);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  mounted() {
    let userId = localStorage.getItem("userId");
    if (userId && userId != "undefined") {
      this.$store.dispatch("logout");
    }
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