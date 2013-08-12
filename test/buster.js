var config = module.exports;

config["tests"] = {
  rootPath: "../",
  environment: "browser",
  libs: [
    "lib/require.js",
    "test/requirejs-config.js"
  ],
  sources: [
    "lib/maria.js",
    "src/js/**/*.js"
  ],
  tests: [
    "test/js/**/test_*.js"
  ],
  testHelpers: [
    "test/lib/helpers.js"
  ],
  extensions: [require("buster-amd")]
}
