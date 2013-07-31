(function() {
  function go(test, url) {
    test.jumps++;
    test.router.go(url);
    //console.log("went to", window.location.href);
  }

  function back(test) {
    test.jumps--;
    window.history.back();
    //console.log("back to", window.location.href);
  }

  buster.testCase('Router', {
    setUp: function() {
      this._url = window.location.href;
      //console.log("started at", this._url);
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

    "Router#go with simple pattern": function(done) {
      var rootUrl = window.location.href;
      var self = this;
      this.router.add('/foo', done(function() {
        assert(true);
        assert.same(this, self);
        assert.equals(window.location.href, rootUrl + "foo");
      }), this);
      go(this, '/foo');
    },

    "reacting to popstate": function(done) {
      var called = false;
      var n = 0;
      this.router.add('/foo', function() {
        n++;
        if (n == 2) {
          done();
        }
      });
      this.router.add('/bar', function() {
        called = true;
      });
      go(this, '/foo');
      go(this, '/bar');
      assert(called);
      back(this);
      window.history.back();
    }
  })
})();
