<template>
  <div>
    <div>
      <admin-nav-bar />
    </div>
  </div>
</template>

<script>
import AdminNavBar from "../components/AdminNavBar";
import { mapGetters } from "vuex";

export default {
  props: ["socket"],
  components: {
    AdminNavBar
  },
  data() {
    return {};
  },
  computed: mapGetters(["role"]),
  mounted() {
    let role = localStorage.getItem("role");
    if (role != "admin") this.$router.push("/login");
  },
  methods: {}
};
</script>
