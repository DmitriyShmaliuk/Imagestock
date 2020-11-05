import keysDev from "./keys.dev";
import keysProd from "./keys.prod";

const modeKeys = {
  development: keysDev,
  production: keysProd,
};

export default modeKeys[process.env.NODE_ENV];
