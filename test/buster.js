var config = module.exports;

config["tests"] = {
  rootPath: "../",
  environment: "browser",
  sources: [
    "lib/maria.js",
    "src/js/namespace.js",
    "src/js/util.js",
    "src/js/models/project.js"
  ],
  tests: [
    "test/js/**/test_*.js"
  ]
}
