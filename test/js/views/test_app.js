define([
  'lib/maria',
  'persistence/local',
  'models/projects',
  'models/project',
  'models/forms',
  'models/form',
  'models/questions',
  'models/question',
  'views/admin/projects',
  'views/admin/project',
  'views/admin/forms',
  'views/admin/form',
  'views/admin/questions',
  'views/app'
], function(maria, LocalStore, ProjectsModel, ProjectModel, FormsModel, FormModel, QuestionsModel, QuestionModel, AdminProjectsView, AdminProjectView, AdminFormsView, AdminFormView, AdminQuestionsView, AppView) {
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
      assert(this.view.childNodes[0] instanceof AdminProjectsView);
    },

    "showProject": function() {
      var project = sinon.createStubInstance(ProjectModel);
      project.getId.returns(123);
      this.stub(this.store, 'find').yieldsTo('success', project);
      this.stub(AdminFormsView.prototype, 'setProjectId');

      this.view.showProject("123");

      assert.calledWith(this.store.find, 'projects', 123, ProjectModel);
      assert.calledWith(this.store.findAll, 'forms',
        sinon.match.instanceOf(FormsModel), FormModel,
        sinon.match.has('filter', {project_id: 123}));
      assert.calledWith(this.store.addSetModel, 'forms', sinon.match.instanceOf(FormsModel));
      assert(this.view.childNodes[0] instanceof AdminProjectView);
      assert(this.view.childNodes[1] instanceof AdminFormsView);
      assert.calledWith(AdminFormsView.prototype.setProjectId, 123);
    },

    "transition to showProject": function() {
      var child = new maria.ElementView();
      this.view.appendChild(child);

      var project = sinon.createStubInstance(ProjectModel);
      project.getId.returns(123);
      this.stub(this.store, 'find').yieldsTo('success', project);
      this.view.showProject("123");
      assert(this.view.childNodes[0] !== child);
      assert(this.view.childNodes[0] instanceof AdminProjectView);
      assert(this.view.childNodes[1] instanceof AdminFormsView);
    },

    "showForm": function() {
      var form = sinon.createStubInstance(FormModel);
      form.getId.returns(123);
      this.stub(this.store, 'find').yieldsTo('success', form);
      this.stub(AdminQuestionsView.prototype, 'setFormId');

      this.view.showForm("123");

      assert.calledWith(this.store.find, 'forms', 123, FormModel);
      assert.calledWith(this.store.findAll, 'questions',
        sinon.match.instanceOf(QuestionsModel), QuestionModel,
        sinon.match.has('filter', {form_id: 123}));
      assert.calledWith(this.store.addSetModel, 'questions', sinon.match.instanceOf(QuestionsModel));
      assert(this.view.childNodes[0] instanceof AdminFormView);
      assert(this.view.childNodes[1] instanceof AdminQuestionsView);
      assert.calledWith(AdminQuestionsView.prototype.setFormId, 123);
    },
  });
});
