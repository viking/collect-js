(function() {
  var debug = false;

  function go(test, url) {
    window.history.pushState({}, "", test.rootUrl + url);
    if (debug) {
      console.log("window went to", window.location.href);
    }
  }

  function back(callback) {
    var popstate = function(e) {
      maria.off(window, 'popstate', popstate);
      if (debug) {
        console.log("back to", window.location.href);
      }
      callback();
    };
    maria.on(window, 'popstate', popstate);
    window.history.back();
  }

  buster.testCase('AppController', {
    setUp: function() {
      this.rootUrl = window.location.href;
      if (debug) {
        console.log("started at", this.rootUrl);
      }

      this.controller = new Collect.AppController();
      this.controller.setRootUrl(this.rootUrl);
      this.view = new Collect.AppView(null, this.controller);
      this.stub(this.view, 'showProjects');
      this.stub(this.view, 'showProject');
    },

    tearDown: function(done) {
      this.view.destroy();
      if (window.location.href != this.rootUrl) {
        var self = this;
        var callback = function() {
          if (window.location.href != self.rootUrl) {
            back(callback)
          }
          else {
            done();
          }
        };
        back(callback);
      }
      else {
        done();
      }
    },

    "initial route": function() {
      this.controller.route();
      assert.calledOnce(this.view.showProjects);
    },

    "initial route with anchors": function() {
      go(this, 'index.html');
      this.controller.setRootUrl(this.rootUrl + 'index.html');
      this.controller.route();
      assert.calledOnce(this.view.showProjects);
    },

    "urlFor": function() {
      assert.equals(this.controller.urlFor('/'), this.rootUrl);
      assert.equals(this.controller.urlFor('/foo'), this.rootUrl + 'foo');
    },

    "urlFor with anchors": function() {
      go(this, 'index.html');
      this.controller.setRootUrl(this.rootUrl + 'index.html');
      assert.equals(this.controller.urlFor('/'), this.rootUrl + 'index.html');
      assert.equals(this.controller.urlFor('/foo'), this.rootUrl + 'index.html#/foo');
    },

    "project route": function() {
      this.controller.go('/projects/1');
      assert.calledWith(this.view.showProject, "1");
    },

    "intercepts clicks to root url": function() {
      var a = document.createElement("A");
      a.setAttribute('href', this.rootUrl);
      var evt = {target: a, preventDefault: this.spy()};
      this.controller.onNavigate(evt);
      assert.calledOnce(this.view.showProjects);
      assert.calledOnce(evt.preventDefault);
    },

    "intercepts clicks to project url": function() {
      var a = document.createElement("A");
      a.setAttribute('href', this.rootUrl + 'projects/1');
      var evt = {target: a, preventDefault: this.spy()};
      this.controller.onNavigate(evt);
      assert.calledWith(this.view.showProject, "1");
      assert.calledOnce(evt.preventDefault);
    },

    "intercepts clicks to project url with anchors": function() {
      go(this, 'index.html');
      this.controller.setRootUrl(this.rootUrl + 'index.html')
      var a = document.createElement("A");
      a.setAttribute('href', this.rootUrl + 'index.html#/projects/1');
      var evt = {target: a, preventDefault: this.spy()};
      this.controller.onNavigate(evt);
      assert.calledWith(this.view.showProject, "1");
      assert.calledOnce(evt.preventDefault);
    },

    "reacting to popstate": function(done) {
      this.view.build();
      this.controller.route();
      this.controller.go('/projects/1');
      var self = this;
      back(done(function() {
        assert.calledTwice(self.view.showProjects);
      }));
    },

    "double route call does nothing": function() {
      this.controller.route();
      this.controller.route();
      assert.calledOnce(this.view.showProjects);
    }
  })
})();
