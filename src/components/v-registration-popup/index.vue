<template>
  <v-popup class="v-registration-popup" :opened="opened" @close="close">
    <v-container fluid>
      <v-row>
        <v-col md="1" offset-md="11">
          <v-icon size="18" color="#999999" @click.native="close"
            >mdi-close</v-icon
          >
        </v-col>
      </v-row>

      <v-row>
        <v-col md="12">
          <h2 class="text-center">Signup Form</h2>
        </v-col>
      </v-row>

      <v-row class="mt-3">
        <v-col md="10" offset-md="1">
          <p class="label">Name</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="10" offset-md="1">
          <v-text-field
            v-model="userData.name"
            solo
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-1">
        <v-col md="10" offset-md="1">
          <p class="label">Email</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="10" offset-md="1">
          <v-text-field
            type="email"
            v-model="userData.email"
            solo
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-1">
        <v-col md="10" offset-md="1">
          <p class="label">Password</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="10" offset-md="1">
          <v-text-field
            type="password"
            v-model="userData.password"
            solo
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-1">
        <v-col md="10" offset-md="1">
          <p class="label">Confirm password</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="10" offset-md="1">
          <v-text-field
            type="password"
            v-model="userData.confirm"
            solo
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-5 button-section">
        <v-col md="10" offset-md="1">
          <v-btn color="#21b8c6" min-width="100%" @click="send">Signup</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-popup>
</template>

<script>
import VPopup from "../v-popup";

export default {
  name: "v-registration-popup",
  components: {
    VPopup,
  },
  props: {
    ...VPopup.props,
  },
  data: () => ({
    userData: {
      name: null,
      email: null,
      password: null,
      confirm: null,
    },
  }),
  methods: {
    ...VPopup.methods,
    send() {
      if (this.confirm === this.password) {
        this.$emit("signup", {
          ...this.userData,
        });
        this.cleanForm();
      }
      else {
        this.$emit('error', "Passwords don't match");
      }
    },
    cleanForm() {
      this.userData.name = null;
      this.userData.email = null;
      this.userData.password = null;
      this.userData.confirm = null;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../common/styles/variables.scss";

.v-registration-popup ::v-deep .popup-content {
  min-height: 62%;

  .container,
  .col {
    padding: 0px;
  }

  .v-input__control {
    min-height: unset;

    .v-input__slot {
      min-height: 30px;
      box-shadow: none;
      border-radius: 0;
      border: 1px solid #999999;
    }
  }

  p {
    margin: 0px;
    font-size: 12px;
  }

  .label {
    font-size: 14px;
  }

  .forgot-password-section,
  .additional-action span {
    color: $brandColor1;
    cursor: pointer;
  }

  .button-section .v-btn__content {
    color: #ffffff;
  }
}
</style>