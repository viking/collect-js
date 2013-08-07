maria.on(window, "load", function() {
  var controller = new Collect.AppController();
  var url = window.location.href.replace(/#.+$/, "");
  controller.setRootUrl(url);

  var store = new Collect.LocalStore();
  var view = new Collect.AppView(null, controller);
  view.setStore(store);

  document.body.appendChild(view.build());
  controller.route();
});
