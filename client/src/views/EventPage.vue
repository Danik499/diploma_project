<template>
  <div>
    <admin-nav-bar />
    <textarea v-model="eventText"></textarea>
    <button @click="send">Send</button>
  </div>
</template>

<script>
import AdminNavBar from "../components/AdminNavBar";
export default {
  components: {
    AdminNavBar
  },
  data() {
    return {
      eventText: ""
    }
  },
  methods: {
    send() {
      
    }
  }
};
</script>

<style lang="css" scoped>
</style>