define([
  'views/app',
  'controllers/app'
], function(AppView, AppController) {
  buster.testCase('AppController', {
    setUp: function() {
      this.window = {
        history: {
          pushState: this.stub()
        },
        addEventListener: this.stub()
      };
      this.controller = new AppController();
      this.controller.setWindow(this.window);
      this.view = new AppView(null, this.controller);
      this.stub(this.view, 'showAdminProjects');
      this.stub(this.view, 'showAdminProject');
      this.stub(this.view, 'showAdminForm');
    },

    "static page": {
      setUp: function() {
        this.window.location = { href: '/index.html' };
        this.controller.setRootUrl('/index.html');
      },

      "initial route": function() {
        this.controller.route();
        assert.calledOnce(this.view.showAdminProjects);
      },

      "urlFor": function() {
        assert.equals(this.controller.urlFor('/'), '/index.html');
        assert.equals(this.controller.urlFor('/bar'), '/index.html#/bar');
      },

      "intercepts clicks to project url": function() {
        var a = document.createElement("A");
        a.setAttribute('href', '/index.html#/projects/1');
        var evt = {target: a, preventDefault: this.spy()};
        this.controller.onNavigate(evt);
        assert.calledWith(this.view.showAdminProject, "1");
        assert.calledOnce(evt.preventDefault);
      },
    },

    "non-static page": {
      setUp: function() {
        this.window.location = { href: '/foo/' };
        this.controller.setRootUrl('/foo/');
      },

      "initial route": function() {
        this.controller.route();
        assert.calledOnce(this.view.showAdminProjects);
      },

      "urlFor": function() {
        assert.equals(this.controller.urlFor('/'), '/foo/');
        assert.equals(this.controller.urlFor('/bar'), '/foo/bar');
      },

      "project route": function() {
        this.controller.go('projects/1');
        assert.calledOnce(this.window.history.pushState);
        assert.calledWith(this.window.history.pushState, {}, "", '/foo/projects/1');
        assert.calledWith(this.view.showAdminProject, "1");
      },

      "intercepts clicks to root url": function() {
        var a = document.createElement("A");
        a.setAttribute('href', '/foo/');
        var evt = {target: a, preventDefault: this.spy()};
        this.controller.onNavigate(evt);
        assert.calledOnce(this.view.showAdminProjects);
        assert.calledOnce(evt.preventDefault);
      },

      "intercepts clicks to project url": function() {
        var a = document.createElement("A");
        a.setAttribute('href', '/foo/projects/1');
        var evt = {target: a, preventDefault: this.spy()};
        this.controller.onNavigate(evt);
        assert.calledWith(this.view.showAdminProject, "1");
        assert.calledOnce(evt.preventDefault);
      },

      "reacting to popstate": function() {
        this.view.build();
        assert.calledWith(this.window.addEventListener, 'popstate');
        this.controller.route();
        this.controller.go('projects/1');

        var evt = {};
        this.window.addEventListener.getCall(0).args[1](evt)
        assert.calledTwice(this.view.showAdminProjects);
      },

      "double route call does nothing": function() {
        this.controller.route();
        this.controller.route();
        assert.calledOnce(this.view.showAdminProjects);
      },

      "form route": function() {
        this.controller.go('forms/1');
        assert.calledOnce(this.window.history.pushState);
        assert.calledWith(this.window.history.pushState, {}, "", '/foo/forms/1');
        assert.calledWith(this.view.showAdminForm, "1");
      },
    }
  })
});
