define([
  'lib/maria',
  'persistence/local',
  'models/projects',
  'models/project',
  'models/forms',
  'models/form',
  'views/projects',
  'views/project',
  'views/forms',
  'views/app'
], function(maria, LocalStore, ProjectsModel, ProjectModel, FormsModel, FormModel, ProjectsView, ProjectView, FormsView, AppView) {
  buster.testCase('AppView', {
    setUp: function() {
      this.store = new LocalStore();
      this.view = new AppView();
      this.view.setStore(this.store);
      this.stub(this.store, 'findAll').yieldsTo('success');
      this.stub(this.store, 'addSetModel');
    },

    "showProjects": function() {
      this.view.showProjects();
      assert.calledWith(this.store.findAll, 'projects', sinon.match.instanceOf(ProjectsModel), ProjectModel);
      assert.calledWith(this.store.addSetModel, 'projects', sinon.match.instanceOf(ProjectsModel));
      assert(this.view.childNodes[0] instanceof ProjectsView);
    },

    "showProject": function() {
      var project = sinon.createStubInstance(ProjectModel);
      project.getId.returns(123);
      this.stub(this.store, 'find').yieldsTo('success', project);
      this.stub(FormsView.prototype, 'setProjectId');

      this.view.showProject("123");

      assert.calledWith(this.store.find, 'projects', 123, ProjectModel);
      assert.calledWith(this.store.findAll, 'forms',
        sinon.match.instanceOf(FormsModel), FormModel,
        sinon.match.has('filter', {project_id: 123}));
      assert.calledWith(this.store.addSetModel, 'forms', sinon.match.instanceOf(FormsModel));
      assert(this.view.childNodes[0] instanceof ProjectView);
      assert(this.view.childNodes[1] instanceof FormsView);
      assert.calledWith(FormsView.prototype.setProjectId, 123);
    },

    "transition to showProject": function() {
      var child = new maria.ElementView();
      this.view.appendChild(child);

      var project = sinon.createStubInstance(ProjectModel);
      project.getId.returns(123);
      this.stub(this.store, 'find').yieldsTo('success', project);
      this.view.showProject("123");
      assert(this.view.childNodes[0] !== child);
      assert(this.view.childNodes[0] instanceof ProjectView);
      assert(this.view.childNodes[1] instanceof FormsView);
    },
  });
});
