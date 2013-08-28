require.config({
  baseUrl: '../src/js',
  paths: {
    lib: '../../lib',
    test: '../../test/js'
  }
});

require([
  'lib/test'
], function(test) {
  var logger = new test.ConsoleLogger(console);
  var runner = new test.Runner(logger);
  require([
    'test/test_util',
    'test/test_input_view',
    'test/test_model',
    'test/controllers/test_app',
    'test/controllers/admin/test_forms_input',
    'test/controllers/admin/test_projects_input',
    'test/controllers/admin/test_questions_input',
    'test/models/test_form',
    'test/models/test_forms',
    'test/models/test_project',
    'test/models/test_projects',
    'test/models/test_question',
    'test/models/test_questions',
    'test/models/test_record',
    'test/models/test_records',
    'test/persistence/test_local',
    'test/views/test_app',
    'test/views/test_project',
    'test/views/test_project_item',
    'test/views/test_projects',
    'test/views/test_projects_list',
    'test/views/admin/test_form',
    'test/views/admin/test_form_item',
    'test/views/admin/test_forms',
    'test/views/admin/test_forms_input',
    'test/views/admin/test_forms_list',
    'test/views/admin/test_project',
    'test/views/admin/test_project_item',
    'test/views/admin/test_projects',
  ], function() {
    for (var i = 0; i < arguments.length; i++) {
      runner.addSuite(arguments[i]);
    }
    runner.run(function() {
      console.log("QUIT");
    });
  });
});
