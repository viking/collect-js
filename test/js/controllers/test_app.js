(function() {
  function go(test, url) {
    test.jumps++;
    test.controller.go(url);
    //console.log("controller went to", window.location.href);
  }

  function go2(test, url) {
    test.jumps++;
    window.history.pushState("", "", test.rootUrl + url);
    //console.log("window went to", window.location.href);
  }

  function back(test, callback) {
    var popstate = function(e) {
      test.jumps--;
      maria.off(window, 'popstate', popstate);
      //console.log("back to", window.location.href);
      callback();
    };
    maria.on(window, 'popstate', popstate);
    window.history.back();
  }

  buster.testCase('AppController', {
    setUp: function() {
      this.rootUrl = window.location.href;
      this.jumps = 0;
      //console.log("started at", this.rootUrl);

      this.controller = new Collect.AppController();
      this.controller.setRootUrl(this.rootUrl);
      this.view = new Collect.AppView(null, this.controller);
      this.stub(this.view, 'showProjects');
    },

    tearDown: function(done) {
      this.view.destroy();
      if (this.jumps > 0) {
        var self = this;
        var callback = function() {
          if (self.jumps > 0) {
            back(self, callback)
          }
          else {
            done();
          }
        };
        back(this, callback);
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
      var self = this;
      go2(this, 'index.html');
      self.controller.setRootUrl(self.rootUrl + 'index.html');
      this.controller.route();
      assert.calledOnce(this.view.showProjects);
    },

    /*
    "reacting to popstate": function(done) {
    },
    */
  })
})();
