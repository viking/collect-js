(function() {
  function go(test, url) {
    test.jumps++;
    test.router.go(url);
    //console.log("went to", window.location.href);
  }

  /* call pushState apart from the router */
  function go2(test, url) {
    test.jumps++;
    window.history.pushState("", "", test.rootUrl + url);
  }

  function back(test) {
    test.jumps--;
    window.history.back();
    //console.log("back to", window.location.href);
  }

  buster.testCase('Router', {
    setUp: function() {
      this.rootUrl = window.location.href;
      //console.log("started at", this.rootUrl);
      this.router = new Collect.Router(window);
      this.jumps = 0;
    },

    tearDown: function(done) {
      this.router.disconnect();
      while (this.jumps) {
        if (this.jumps == 1) {
          var popstate = window.onpopstate;
          window.onpopstate = function(e) {
            window.onpopstate = popstate;
            //console.log("ended at", window.location.href);
            done();
          };
        }
        back(this);
      }
    },

    "simple pattern": function(done) {
      var self = this;
      this.router.add('/foo', done(function() {
        assert.same(this, self);
        assert.equals(window.location.href, this.rootUrl + "foo");
      }), this);
      go(this, '/foo');
    },

    "pattern with groups": function(done) {
      this.router.add('/projects/(\\d+)', done(function(matches) {
        assert.equals(matches, ["123"]);
      }));
      go(this, '/projects/123');
    },

    "reacting to popstate": function(done) {
      var fooTimes = 0;
      var barTimes = 0;
      this.router.add('/foo', function() {
        fooTimes++;
        if (fooTimes == 2) {
          assert.equals(barTimes, 1);
          done();
        }
      });
      this.router.add('/bar', function() {
        barTimes++;
      });
      go(this, '/foo');
      go(this, '/bar');
      back(this);
      window.history.back();
    },

    "start": function(done) {
      go2(this, 'foo');
      this.router.add('/foo', done(function() {
        assert(true);
      }));
      this.router.start();
    },
  })
})();
