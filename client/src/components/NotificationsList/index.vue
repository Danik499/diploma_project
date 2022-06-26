<template>
  <div>
    <div
      class="notifications-row"
      v-for="(n, index) in notifications"
      :key="index"
    >
      <div class="notification">
        <notifications-item :notification="n[0]" />
      </div>
      <div v-if="n[1]" class="notification">
        <notifications-item :notification="n[1]" />
      </div>
    </div>
  </div>
</template>

<script>
import NotificationsItem from "@/components/NotificationsItem";
export default {
  components: {
    NotificationsItem,
  },
  props: {
    notifications: [],
  },
};
</script>

<style lang="css" scoped>
.notifications-row {
  display: flex;
  justify-content: space-between;
}

.notification {
  width: 45%;
  margin-top: 10px;
  padding: 10px;
  border: 1px black solid;
}
</style>