 const fabric= require('@umijs/fabric/');

module.exports = {
  ...fabric.default,
  extends: [...fabric.default.extends,'next/core-web-vitals'],

  globals: {},

  rules: {
    // your rules
  },
};
