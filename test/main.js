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
  ], function(one, two, three) {
    runner.addSuite(one);
    runner.addSuite(two);
    runner.addSuite(three);
    runner.run(function() {
      console.log("QUIT");
    });
  });
});
