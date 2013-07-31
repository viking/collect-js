maria.on(window, "load", function() {
  var setModel = new Collect.ProjectsModel();
  var view = new Collect.AppView(setModel);
  var store = new Collect.LocalStore();

  store.populate('projects', setModel, Collect.ProjectModel, {
    success: function() {
      store.addSetModel('projects', setModel);
    }
  });

  document.body.appendChild(view.build());
});
