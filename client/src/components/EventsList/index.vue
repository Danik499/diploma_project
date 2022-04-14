<template>
  <div>
    <div v-for="e in events" :key="e._id">
      <event :event="e" />
    </div>
  </div>
</template>

<script>
import Event from "../Event";

export default {
  components: {
    Event
  },
  props: {
    events: []
  }
};
</script>

<style lang="css" scoped>
</style>