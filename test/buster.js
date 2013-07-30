var config = module.exports;

config["tests"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    "lib/maria.js",
    "lib/jquery.js",
    "lib/jquery-ui.js",
    "src/js/namespace.js",
    "src/js/util.js",
    "src/js/persistence/*.js",
    "src/js/models/*.js",
    "src/js/templates/*.js",
    "src/js/views/*.js",
    //"src/js/controllers/*.js",
  ],
  tests: [
    "test/js/**/test_*.js"
  ]
}
