<template>
  <div>
    <span
      ><b>{{ notification.eventName }}</b></span
    >
    <br />
    <span>{{ notification.title }}</span> <br />
    <span class="date"> posted at {{ notification.date }}</span>
  </div>
</template>

<script>
export default {
  props: {
    notification: {},
  },
};
</script>

<style lang="css" scoped>
.date {
  float: right;
}
</style>