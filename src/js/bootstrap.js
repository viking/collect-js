maria.on(window, "load", function() {
  var setModel = new Collect.ProjectsModel();
  var view = new Collect.ProjectsListView(setModel);
  var store = new Collect.LocalStore();
  store.getCollection('projects', function(collection) {
    for (var i = 0; i < collection.length; i++) {
      var model = new Collect.ProjectModel();
      model.setId(collection[i].id);
      model.setName(collection[i].name);
      setModel.add(model);
    }
  });

  document.body.appendChild(view.build());
});
