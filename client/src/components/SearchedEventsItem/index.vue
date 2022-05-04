<template>
  <div>
    <div class="event-item">
      <div class="info">{{ item.name }}</div>
      <div class="sub">
        <button @click="subscribeHandler">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {},
  },
  data() {
    return {
      buttonText: "",
    };
  },
  methods: {
    async subscribeHandler() {
      try {
        await this.$store.dispatch("subscribe", {
          userId: localStorage.getItem("userId"),
          eventId: this.item._id,
        });
        if (this.buttonText == "Subscribe") this.buttonText = "Unsubscribe";
        else this.buttonText = "Subscribe";
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  mounted() {
    this.buttonText = !this.item.subscribers.includes(
      localStorage.getItem("userId")
    )
      ? "Subscribe"
      : "Unsubscribe";
  },
};
</script>

<style lang="css" scoped>
.event-item {
  border: 1px solid black;
  padding: 5px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
}
</style>