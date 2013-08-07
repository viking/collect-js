buster.testCase('AppView', {
  setUp: function() {
    this.store = new Collect.LocalStore();
    this.view = new Collect.AppView();
    this.view.setStore(this.store);
    this.stub(this.store, 'findAll').yieldsTo('success');
    this.stub(this.store, 'addSetModel');
  },

  "showProjects": function() {
    stubView(this, Collect, 'ProjectsView');
    this.view.showProjects();
    assert.calledWith(this.store.findAll, 'projects', sinon.match.instanceOf(Collect.ProjectsModel), Collect.ProjectModel);
    assert.calledWith(this.store.addSetModel, 'projects', sinon.match.instanceOf(Collect.ProjectsModel));
    assert.same(this.view.childNodes[0], getInstance(Collect, 'ProjectsView'));
  },

  "showProject": function() {
    var project = sinon.createStubInstance(Collect.ProjectModel);
    project.getId.returns(123);
    this.stub(this.store, 'find').yieldsTo('success', project);
    stubView(this, Collect, 'ProjectView');
    stubView(this, Collect, 'FormsView');

    this.view.showProject("123");

    assert.calledWith(this.store.find, 'projects', 123, Collect.ProjectModel);
    assert.calledWith(this.store.findAll, 'forms',
      sinon.match.instanceOf(Collect.FormsModel), Collect.FormModel,
      sinon.match.has('filter', {project_id: 123}));
    assert.calledWith(this.store.addSetModel, 'forms', sinon.match.instanceOf(Collect.FormsModel));
    assert.same(this.view.childNodes[0], getInstance(Collect, 'ProjectView'));
    assert.same(this.view.childNodes[1], getInstance(Collect, 'FormsView'));
    assert.calledWith(getInstance(Collect, 'FormsView').setProjectId, 123);
  },

  "transition to showProject": function() {
    var child = new maria.ElementView();
    this.view.appendChild(child);

    var project = sinon.createStubInstance(Collect.ProjectModel);
    project.getId.returns(123);
    this.stub(this.store, 'find').yieldsTo('success', project);
    stubView(this, Collect, 'ProjectView');
    stubNew(this, Collect, 'FormsView', function(view) {
      this.stub(view, 'setProjectId');
    });
    this.view.showProject("123");
    assert(this.view.childNodes[0] !== child);
    assert.same(this.view.childNodes[0], getInstance(Collect, 'ProjectView'));
    assert.same(this.view.childNodes[1], getInstance(Collect, 'FormsView'));
  },
});
