#!/usr/bin/env node

var requirejs = require('requirejs');

var config = {
  baseUrl: "src/js",
  paths: {
    lib: "../../lib"
  },
  name: "bootstrap",
  out: "src/js/collect.js"
};

requirejs.optimize(config);
