require.config({
  baseUrl: '../src/js',
  paths: {
    lib: '../../lib',
    test: '../../test'
  }
});

require([
  'lib/test'
], function(test) {
  var logger = new test.ConsoleLogger(console);
  var runner = new test.Runner(logger);
  require([
    'test/js/test_util',
    'test/js/test_input_view',
    'test/js/test_model',
    'test/js/controllers/test_app',
    'test/js/controllers/admin/test_forms_input',
    'test/js/controllers/admin/test_projects_input',
    'test/js/controllers/admin/test_questions_input',
    'test/js/models/test_form',
    'test/js/models/test_forms',
  ], function() {
    for (var i = 0; i < arguments.length; i++) {
      runner.addSuite(arguments[i]);
    }
    runner.run(function() {
      console.log("QUIT");
    });
  });
});
