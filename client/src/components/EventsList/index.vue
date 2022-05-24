<template>
  <div>
    <div v-for="e in events" :key="e._id">
      <event :event="e" @rerender="rerender" />
    </div>
  </div>
</template>

<script>
import Event from "../Event";

export default {
  components: {
    Event,
  },
  props: {
    events: [],
  },
  methods: {
    rerender() {
      this.$emit("rerender");
    },
  },
};
</script>

<style lang="css" scoped>
</style>