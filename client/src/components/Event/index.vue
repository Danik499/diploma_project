<template>
  <div>
    {{event.name}}
    <button @click="open">Open</button>
  </div>
</template>

<script>
export default {
  props: {
    event: {}
  },
  methods: {
    open() {
      this.$router.push("/event/" + this.event._id);
    }
  }
};
</script>

<style lang="css" scoped>
</style>