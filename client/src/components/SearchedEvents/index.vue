<template>
  <div>
    <div v-for="event in events" :key="event._id">
      <searched-events-item :item="event" />
    </div>
  </div>
</template>

<script>
import SearchedEventsItem from "@/components/SearchedEventsItem";
export default {
  components: {
    SearchedEventsItem
  },
  props: {
    events: []
  }
};
</script>

<style lang="css" scoped></style>