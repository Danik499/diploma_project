<template>
  <div class="event-card">
    <div class="right-content">
      <span>{{ event.name }}</span> <br />
      <div class="post-date">
        {{
          event.lastPosted
            ? "Last posted at " + event.lastPosted
            : "Not posted yet"
        }}
      </div>
    </div>
    <div class="left-content">
      <div class="buttons">
        <div></div>
        <div>
          <button class="open-button" @click="open">Open</button><br />
          <button class="delete-button" @click="deleteEvent">Delete</button>
          <br />
        </div>
      </div>
      <div class="subs-count">
        <span
          >{{ event.subscribersCount }} subscriber{{
            event.subscribersCount % 2 ? "" : "s"
          }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {},
  },
  methods: {
    open() {
      this.$router.push("/event/" + this.event._id);
    },
    deleteEvent() {
      let toDelete = confirm(
        `Are you sure you want to delete ${this.event.name}?`
      );
      if (toDelete) {
        this.$emit("rerender");
        this.$store.dispatch("deleteEvent", { eventId: this.event._id });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.event-card {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
}

.right-content {
  position: relative;
  width: 70%;
}

.post-date {
  position: absolute;
  bottom: 0;
  left: 0;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.open-button {
  float: right;
}

.delete-button {
  margin-top: 5px;
}

.subs-count {
  margin-top: 5px;
}
</style>