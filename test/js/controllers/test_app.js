define([
  'lib/test',
  'lib/sinon',
  'views/app',
  'controllers/app'
], function(test, sinon, AppView, AppController) {
  return new test.Suite('AppController', {
    setUp: function() {
      this.window = {
        history: {
          pushState: sinon.stub()
        },
        addEventListener: sinon.stub()
      };
      this.controller = new AppController();
      this.controller.setWindow(this.window);
      this.view = new AppView(null, this.controller);
      sinon.stub(this.view, 'showProjects');
      sinon.stub(this.view, 'showProject');
      sinon.stub(this.view, 'showAdminProjects');
      sinon.stub(this.view, 'showAdminProject');
      sinon.stub(this.view, 'showAdminForm');
    },

    "static page": new test.Suite('static page', {
      setUp: function() {
        this.window.location = { href: '/index.html' };
        this.controller.setRootUrl('/index.html');
      },

      "initial route": function() {
        this.controller.route();
        this.assertCalled(this.view.showProjects, 1);
      },

      "urlFor": function() {
        this.assertEquals(this.controller.urlFor('/'), '/index.html');
        this.assertEquals(this.controller.urlFor('/bar'), '/index.html#/bar');
      },

      "intercepts clicks to admin project url": function() {
        var a = document.createElement("A");
        a.setAttribute('href', '/index.html#/admin/projects/1');
        var evt = {target: a, preventDefault: sinon.spy()};
        this.controller.onNavigate(evt);
        this.assertCalledWith(this.view.showAdminProject, "1");
        this.assertCalled(evt.preventDefault, 1);
      },
    }),

    "non-static page": new test.Suite('non-static page', {
      setUp: function() {
        this.window.location = { href: '/foo/' };
        this.controller.setRootUrl('/foo/');
      },

      "initial route": function() {
        this.controller.route();
        this.assertCalled(this.view.showProjects, 1);
      },

      "urlFor": function() {
        this.assertEquals(this.controller.urlFor('/'), '/foo/');
        this.assertEquals(this.controller.urlFor('/bar'), '/foo/bar');
      },

      "admin project route": function() {
        this.controller.go('admin/projects/1');
        this.assertCalled(this.window.history.pushState, 1);
        this.assertCalledWith(this.window.history.pushState, {}, "", '/foo/admin/projects/1');
        this.assertCalledWith(this.view.showAdminProject, "1");
      },

      "intercepts clicks to root url": function() {
        var a = document.createElement("A");
        a.setAttribute('href', '/foo/');
        var evt = {target: a, preventDefault: sinon.spy()};
        this.controller.onNavigate(evt);
        this.assertCalled(this.view.showProjects, 1);
        this.assertCalled(evt.preventDefault, 1);
      },

      "intercepts clicks to admin project url": function() {
        var a = document.createElement("A");
        a.setAttribute('href', '/foo/admin/projects/1');
        var evt = {target: a, preventDefault: sinon.spy()};
        this.controller.onNavigate(evt);
        this.assertCalledWith(this.view.showAdminProject, "1");
        this.assertCalled(evt.preventDefault, 1);
      },

      "reacting to popstate": function() {
        this.view.build();
        this.assertCalledWith(this.window.addEventListener, 'popstate');
        this.controller.route();
        this.controller.go('admin/projects/1');

        var evt = {};
        this.window.addEventListener.getCall(0).args[1](evt)
        this.assertCalled(this.view.showProjects, 2);
      },

      "double route call does nothing": function() {
        this.controller.route();
        this.controller.route();
        this.assertCalled(this.view.showProjects, 1);
      },

      "admin form route": function() {
        this.controller.go('admin/forms/1');
        this.assertCalled(this.window.history.pushState, 1);
        this.assertCalledWith(this.window.history.pushState, {}, "", '/foo/admin/forms/1');
        this.assertCalledWith(this.view.showAdminForm, "1");
      },

      "project route": function() {
        this.controller.go('projects/1');
        this.assertCalled(this.window.history.pushState, 1);
        this.assertCalledWith(this.window.history.pushState, {}, "", '/foo/projects/1');
        this.assertCalledWith(this.view.showProject, "1");
      },
    })
  })
});
