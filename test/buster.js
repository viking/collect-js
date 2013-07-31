var config = module.exports;

config["tests"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    "lib/maria.js",
    "src/js/namespace.js",
    "src/js/util.js",
    "src/js/router.js",
    "src/js/persistence/*.js",
    "src/js/models/*.js",
    "src/js/templates/*.js",
    "src/js/views/*.js",
    "src/js/controllers/*.js",
  ],
  tests: [
    "test/js/**/test_*.js"
  ],
  testHelpers: [
    "test/lib/helpers.js"
  ]
}
