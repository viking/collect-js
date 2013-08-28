define(function() {
  var test = {};

  /* source: http://stackoverflow.com/questions/9382167/serializing-object-that-contains-cyclic-object-value */
  test.serialize = function(obj) {
    seen = []
    return JSON.stringify(obj, function(key, val) {
      if (typeof val == "object") {
        if (seen.indexOf(val) >= 0)
          return
        seen.push(val)
      }
      return val
    });
  };

  /* Suite */
  test.Suite = function(name, options) {
    this._name = name;
    this._tests = {};
    this._testNames = [];
    this._errors = [];
    for (var key in options) {
      if (key == "setUp" || key == "tearDown") {
        this['_' + key] = options[key];
      }
      else if (key in this._tests) {
        throw('test "' + key + '" already exists for suite "' + name + '"');
      }
      else {
        this._tests[key] = options[key];
        this._testNames.push(key);

        if (options[key] instanceof test.Suite) {
          options[key].wrapSetUp(this._setUp);
          options[key].wrapTearDown(this._tearDown);
        }
      }
    }
  };

  test.Suite.prototype.getName = function() {
    return this._name;
  };

  test.Suite.prototype.getErrors = function() {
    return this._errors;
  };

  test.Suite.prototype.wrapSetUp = function(f) {
    if (this._setUp) {
      var original = this._setUp;
      this._setUp = function() {
        f.apply(this);
        original.apply(this);
      };
    }
    else {
      this._setUp = f;
    }
  };

  test.Suite.prototype.wrapTearDown = function(f) {
    if (this._tearDown) {
      var original = this._tearDown;
      var self = this;
      this._tearDown = function() {
        f.apply(self);
        original.apply(self);
      };
    }
    else {
      this._tearDown = f;
    }
  };

  test.Suite.prototype.run = function(callback) {
    this._errors = [];
    return this._runTest(0, callback);
  };

  test.Suite.prototype._runTest = function(index, callback) {
    if (index >= this._testNames.length) {
      callback();
      return;
    }

    var t = this._tests[this._testNames[index]];
    if (t instanceof test.Suite) {
      var self = this;
      t.run(function() {
        var errors = t.getErrors();
        if (errors.length > 0) {
          self._addError(index, errors);
        }
        self._runTest(index + 1, callback);
      });
    }
    else {
      //console.log("running test " + index);
      var context = new test.Context();
      var queue = [];

      if (this._setUp) {
        queue.push(this._setUp);
      }
      queue.push(t);
      if (this._tearDown) {
        queue.push(this._tearDown);
      }

      this._call(queue, context, index, callback);
    }
  };

  test.Suite.prototype._call = function(queue, context, index, callback) {
    if (queue.length == 0) {
      /* run next test */
      index++;

      var self = this;
      setTimeout(function() {
        self._runTest(index, callback);
      }, 0);
    }
    else {
      var f;
      var t = queue.shift();
      var async = t.length > 0;
      var self = this;

      if (async) {
        f = function() {
          var timerId = setTimeout(function() {
            try {
              throw new Error("timed out");
            }
            catch (e) {
              self._addError(index, e);
            }

            //console.log("test " + index + ": timed out");
            self._call(queue, context, index, callback);
          }, 150);

          var done = function(d) {
            if (typeof(d) == "function") {
              return function() {
                clearTimeout(timerId);
                try {
                  d.apply(context, arguments);
                }
                catch (e) {
                  self._addError(index, e);
                }
                //console.log("test " + index + ": finished");
                self._call(queue, context, index, callback);
              }
            }
            else {
              clearTimeout(timerId);
              self._call(queue, context, index, callback);
            }
          };

          t.call(context, done);
        };
      }
      else {
        f = t;
      }

      setTimeout(function() {
        try {
          f.apply(context);
        }
        catch (e) {
          self._addError(index, e);
          queue = [];
        }

        if (!async) {
          self._call(queue, context, index, callback);
        }
      }, 0);
    }
  };

  test.Suite.prototype._addError = function(index, error) {
    this._errors.push({
      name: this._testNames[index],
      error: error
    });
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

  test.Context.prototype.assertSame = function(actual, expected, message) {
    if (typeof(message) == "undefined") {
      message = "expected: " + test.serialize(expected) + ", got: " + test.serialize(actual);
    }
    this.assert(actual === expected, message);
  };

  test.Context.prototype.assertEquals = function(actual, expected, message) {
    if (typeof(message) == "undefined") {
      message = "expected: " + test.serialize(expected) + ", got: " + test.serialize(actual);
    }
    this.assert(typeof(actual) == typeof(expected), message)
    if (typeof(expected) == "object") {
      var actualKeys = [];
      for (var key in actual) {
        actualKeys.push(key);
      }

      for (var key in expected) {
        var index = actualKeys.indexOf(key);
        if (index < 0) {
          this.assert(false, message);
        }
        this.assertEquals(actual[key], expected[key]);
        actualKeys.splice(index, 1);
      }
      if (actualKeys.length > 0) {
        this.assert(false, message);
      }
    }
    else {
      this.assert(actual == expected, message);
    }
  };

  test.Context.prototype.assertException = function(f, message) {
    var thrown = false;
    try {
      f();
    }
    catch (e) {
      thrown = true;
    }

    if (typeof(message) == "undefined") {
      message = "expected function to throw an exception";
    }
    this.assert(thrown, message);
  };

  test.Context.prototype.assertCalled = function(spy, num, message) {
    var result;
    if (typeof(num) == "undefined") {
      result = spy.callCount > 0;
      if (!result && typeof(message) == "undefined") {
        message = "expected function to be called, but wasn't";
      }
    }
    else {
      result = spy.callCount == num;
      if (!result && typeof(message) == "undefined") {
        message = "expected call count: " + num + ", actual: " + spy.callCount;
      }
    }
    if (!result) {
      assert(false, message);
    }
  };

  test.Context.prototype.assertCalledWith = function(spy) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    var result = spy.calledWith.apply(spy, args);
    this.assert(result, "expected function to be called with " + test.serialize(args));
  };

  test.Context.prototype.refute = function(value, message) {
    this.assert(!value, message);
  };

  test.Context.prototype.refuteCalled = function(spy, num, message) {
    var result;
    if (typeof(num) == "undefined") {
      result = spy.callCount == 0;
      if (!result && typeof(message) == "undefined") {
        message = "expected function to not be called";
      }
    }
    else {
      result = spy.callCount != num;
      if (!result && typeof(message) == "undefined") {
        message = "expected call count to not be " + num;
      }
    }
    if (!result) {
      assert(false, message);
    }
  };

  /* Runner */
  test.Runner = function(logger) {
    this._logger = logger;
    this._suites = [];
  };

  test.Runner.prototype.discover = function(dir, pattern, callback) {
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
          callback();
        });
      });
    });
  };

  test.Runner.prototype.addSuite = function(suite) {
    this._suites.push(suite);
  };

  test.Runner.prototype.run = function(callback) {
    this._runSuite(0, callback);
  };

  test.Runner.prototype._runSuite = function(index, callback) {
    if (index == this._suites.length) {
      callback();
    }
    else {
      var suite = this._suites[index];
      var self = this;
      this._logger.start(suite.getName());
      suite.run(function() {
        var errors = suite.getErrors();

        if (errors.length == 0) {
          self._logger.success();
        }
        else {
          for (var j = 0; j < errors.length; j++) {
            var error = errors[j];
            self._logger.failure(error.name, error.error);
          }
        }
        self._runSuite(index + 1, callback);
      });
    }
  };

  /* source: http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search */
  test.Runner.prototype._walk = function(fs, dir, pattern, callback) {
    var results = [];
    var self = this;
    fs.readdir(dir, function(err, list) {
      if (err) {
        return callback(err);
      }

      var pending = list.length;
      if (!pending) {
        return callback(null, results);
      }

      list.forEach(function(basename) {
        var path = dir + '/' + basename;
        fs.stat(path, function(err, stat) {
          if (stat && stat.isDirectory()) {
            self._walk(fs, path, pattern, function(err, res) {
              results = results.concat(res);
              if (!--pending) {
                callback(null, results);
              }
            });
          }
          else {
            if (basename.match(pattern)) {
              results.push(path);
            }
            if (!--pending) {
              callback(null, results);
            }
          }
        });
      });
    });
  };

  /* StreamLogger */
  test.StreamLogger = function(writer) {
    this._writer = writer;
  };

  test.StreamLogger.prototype.start = function(suiteName) {
    this._writer.write("running suite: " + suiteName + "\n");
  };

  test.StreamLogger.prototype.success = function() {
    this._writer.write("    success!\n");
  };

  test.StreamLogger.prototype.failure = function(name, error) {
    this._writer.write("    failure: " + name + " (" + error.message + ") \n");

    var lines = error.stack.split('\n');
    for (var i = 0, len = lines.length; i < len; i++) {
      if (lines[i].match(/^\s+at/)) {
        this._writer.write("        " + lines[i].replace(/^\s*/, "") + "\n");
      }
    }
  };

  /* ConsoleLogger */
  test.ConsoleLogger = function(console) {
    this._console = console;
  };

  test.ConsoleLogger.prototype.start = function(suiteName) {
    this._console.log("running suite: " + suiteName);
  };

  test.ConsoleLogger.prototype.success = function() {
    this._console.log("    success!");
  };

  test.ConsoleLogger.prototype.failure = function(name, error, indent) {
    if (typeof(indent) == "undefined") {
      indent = 1;
    }
    indentString = "";
    for (var i = 0; i < indent; i++) {
      indentString += "    ";
    }

    if (error instanceof Array) {
      if (error.length > 0) {
        this._console.log(indentString + name + ":");
        for (var i = 0; i < error.length; i++) {
          this.failure(error[i].name, error[i].error, indent + 1);
        }
      }
    }
    else {
      this._console.log(indentString + "failure: " + name + " (" + error.message + ")");

      var lines = error.stack.split('\n');
      for (var i = 0, len = lines.length; i < len; i++) {
        if (lines[i].match(/^\s+at/)) {
          this._console.log(indentString + indentString + lines[i].replace(/^\s*/, ""));
        }
      }
    }
  };

  return test;
});
