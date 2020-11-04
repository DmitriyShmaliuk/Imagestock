<template>
  <transition name="fade">
    <v-container class="v-popup" fluid v-if="opened" @click.self="close">
      <v-container class="popup-content" fluid>
        <slot></slot>
      </v-container>
    </v-container>
  </transition>
</template>

<script>
export default {
  name: "v-popup",
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  }
};
</script>

<style lang="scss" scoped>
.v-popup {
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);

  .popup-content {
    width: 30%;
    min-height: 51%;
    background: #ffffff;
    border-radius: 1rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>