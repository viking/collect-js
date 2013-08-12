requirejs.config({
  paths: {
    lib: '../../lib'
  }
});

define([
  'persistence/local',
  'controllers/app',
  'views/app'
], function(LocalStore, AppController, AppView) {
  var controller = new AppController();
  var url = window.location.href.replace(/#.+$/, "");
  controller.setRootUrl(url);

  var store = new LocalStore();
  var view = new AppView(null, controller);
  view.setStore(store);

  document.body.appendChild(view.build());
  controller.route();
});
