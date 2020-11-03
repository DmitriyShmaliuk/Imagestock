<template>
  <v-popup class="v-authentication-popup" :opened="opened" @close="close">
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
          <h2 class="text-center">Login Form</h2>
        </v-col>
      </v-row>

      <v-row class="mt-3">
        <v-col md="10" offset-md="1">
          <p class="label">Email</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="10" offset-md="1">
          <v-text-field solo hide-details></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-1">
        <v-col md="10" offset-md="1">
          <p class="label">Password</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col md="10" offset-md="1">
          <v-text-field solo hide-details></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mt-1 forgot-password-section">
        <v-col md="10" offset-md="1">
          <p>Forgot password?</p>
        </v-col>
      </v-row>

      <v-row class="mt-5 button-section">
        <v-col md="10" offset-md="1">
          <v-btn color="#21b8c6" min-width="100%">Login</v-btn>
        </v-col>
      </v-row>

      <v-row class="mt-3 text-center additional-action">
        <v-col md="10" offset-md="1">
          <p>
            <span>Reset password</span> or
            <span>Signup now</span>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-popup>
</template>

<script>
import VPopup from "../v-popup";

export default {
  name: "v-authentication-popup",
  components: {
    VPopup,
  },
  props: {
    ...VPopup.props,
  },
  methods: {
    ...VPopup.methods,
  },
};
</script>

<style lang="scss" scoped>
@import "../../common/styles/variables.scss";

.v-authentication-popup ::v-deep .popup-content {
  @media screen and (min-width: 1280px) {
    width: 25%;
  }

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