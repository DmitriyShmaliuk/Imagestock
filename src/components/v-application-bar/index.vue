<template>
  <v-container class="v-application-bar mr-0 ml-0 pt-0" fluid>
    <v-row>
      <v-col class="title" md="3" offset-md="1">
        <p class="mb-0">Imagestock</p>
      </v-col>

      <v-col class="d-flex justify-end align-center" md="3" offset-md="4">
        <v-img
          class="avatar"
          max-width="33"
          max-height="33"
          :src="userImage"
          v-if="userImage"
          @click.native="openAuthPopup"
        ></v-img>
        <v-icon size="33" v-else @click.native="openAuthPopup"
          >mdi-account-circle</v-icon
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "v-application-bar",
  props: {
    userImage: {
      type: String,
      default: null,
    },
  },
  methods: {
    openAuthPopup() {
      this.$emit("open-auth-popup");
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application-bar {
  width: 100% !important;
  height: 54px;
  background: rgba(255, 255, 255, 0);
  border-bottom: 1px solid rgba(219, 219, 219, 1);

  .title {
    font-size: 24px;
    font-weight: 900;
    color: #21b8c6;
  }

  .avatar {
    border-radius: 50%;
  }
}
</style>