define(function() {
  var test = {};

  /* Suite */
  test.Suite = function(name, options) {
    this._name = name;
    this._tests = {};
    for (var key in options) {
      if (key == "setUp" || key == "tearDown") {
        this['_' + key] = options[key];
      }
      else if (key in this._tests) {
        throw('test "' + key + '" already exists for suite "' + name + '"');
      }
      else {
        this._tests[key] = options[key];
      }
    }
  };

  test.Suite.prototype.getName = function() {
    return this._name;
  };

  test.Suite.prototype.run = function() {
    var errors = [];
    for (var key in this._tests) {
      var context = new test.Context();

      if (this._setUp) {
        this._setUp.call(context);
      }

      try {
        this._tests[key].call(context);
      }
      catch (e) {
        errors.push({ name: key, error: e });
      }

      if (this._tearDown) {
        this._tearDown.call(context);
      }
    }
    return errors;
  };

  /* AssertionError */
  test.AssertionError = function(message) {
    Error.apply(this, arguments);
    this.message = message;
  };

  test.AssertionError.prototype = new Error();

  /* Context */
  test.Context = function() {
  };

  test.Context.prototype.assert = function(value, message) {
    if (!value) {
      throw(new test.AssertionError(message ? message : "assertion failed"));
    }
  };

  test.Context.prototype.assertEquals = function(actual, expected, message) {
    this.assert(actual == expected, "expected <" + expected + ">, got <" + actual + ">");
  };

  /* Runner */
  test.Runner = function(logger) {
    this._logger = logger;
    this._suites = [];
  };

  test.Runner.prototype.discover = function(dir, pattern, done) {
    var self = this;
    require(['fs'], function(fs) {
      self._walk(fs, dir, pattern, function(err, files) {
        if (err) {
          throw(err);
        }
        require(files, function() {
          for (var key in arguments) {
            self.addSuite(arguments[key]);
          }
          done();
        });
      });
    });
  };

  test.Runner.prototype.addSuite = function(suite) {
    this._suites.push(suite);
  };

  test.Runner.prototype.run = function() {
    for (var i = 0; i < this._suites.length; i++) {
      var suite = this._suites[i];
      this._logger.start(suite.getName());
      var failures = suite.run();

      if (failures.length == 0) {
        this._logger.success();
      }
      else {
        for (var j = 0; j < failures.length; j++) {
          var failure = failures[j];
          this._logger.failure(failure.name, failure.error);
        }
      }
    }
  };

  /* source: http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search */
  test.Runner.prototype._walk = function(fs, dir, pattern, done) {
    var results = [];
    var self = this;
    fs.readdir(dir, function(err, list) {
      if (err) {
        return done(err);
      }

      var pending = list.length;
      if (!pending) {
        return done(null, results);
      }

      list.forEach(function(basename) {
        var path = dir + '/' + basename;
        fs.stat(path, function(err, stat) {
          if (stat && stat.isDirectory()) {
            self._walk(fs, path, pattern, function(err, res) {
              results = results.concat(res);
              if (!--pending) {
                done(null, results);
              }
            });
          }
          else {
            if (basename.match(pattern)) {
              results.push(path);
            }
            if (!--pending) {
              done(null, results);
            }
          }
        });
      });
    });
  };

  /* ConsoleLogger */
  test.ConsoleLogger = function(writer) {
    this._writer = writer;
  };

  test.ConsoleLogger.prototype.start = function(suiteName) {
    this._writer.write("running suite: " + suiteName + "\n");
  };

  test.ConsoleLogger.prototype.success = function() {
    this._writer.write("    success!\n");
  };

  test.ConsoleLogger.prototype.failure = function(name, error) {
    this._writer.write("    failure: " + name + " (" + error.message + ") \n");

    var lines = error.stack.split('\n');
    for (var i = 0, len = lines.length; i < len; i++) {
      if (lines[i].match(/^\s+at/)) {
        this._writer.write("        " + lines[i].replace(/^\s*/, "") + "\n");
      }
    }
  };

  return test;
});
