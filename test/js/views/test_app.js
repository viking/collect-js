define([
  'lib/maria',
  'persistence/local',
  'models/projects',
  'models/project',
  'models/forms',
  'models/form',
  'models/questions',
  'models/question',
  'views/projects',
  'views/admin/projects',
  'views/admin/project',
  'views/admin/forms',
  'views/admin/form',
  'views/admin/questions',
  'views/app'
], function(maria, LocalStore, ProjectsModel, ProjectModel, FormsModel, FormModel, QuestionsModel, QuestionModel, ProjectsView, AdminProjectsView, AdminProjectView, AdminFormsView, AdminFormView, AdminQuestionsView, AppView) {
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

    "showAdminProjects": function() {
      this.view.showAdminProjects();
      assert.calledWith(this.store.findAll, 'projects', sinon.match.instanceOf(ProjectsModel), ProjectModel);
      assert.calledWith(this.store.addSetModel, 'projects', sinon.match.instanceOf(ProjectsModel));
      assert(this.view.childNodes[0] instanceof AdminProjectsView);
    },

    "showAdminProject": function() {
      var project = sinon.createStubInstance(ProjectModel);
      project.getId.returns(123);
      var forms = sinon.createStubInstance(FormsModel);
      forms.toArray.returns([]);
      project.getForms.returns(forms);

      this.stub(this.store, 'find').yieldsTo('success', project);
      this.stub(AdminFormsView.prototype, 'setProjectId');

      this.view.showAdminProject("123");

      assert.calledWith(this.store.find, 'projects', 123, ProjectModel);
      assert.calledWith(this.store.findAll, 'forms', forms, FormModel,
        sinon.match.has('filter', {project_id: 123}));
      assert.calledWith(this.store.addSetModel, 'forms', forms);
      assert(this.view.childNodes[0] instanceof AdminProjectView);
      assert(this.view.childNodes[1] instanceof AdminFormsView);
      assert.calledWith(AdminFormsView.prototype.setProjectId, 123);
    },

    "transition to showAdminProject": function() {
      var child = new maria.ElementView();
      this.view.appendChild(child);

      var project = sinon.createStubInstance(ProjectModel);
      project.getId.returns(123);
      var forms = sinon.createStubInstance(FormsModel);
      forms.toArray.returns([]);
      project.getForms.returns(forms);

      this.stub(this.store, 'find').yieldsTo('success', project);
      this.view.showAdminProject("123");
      assert(this.view.childNodes[0] !== child);
      assert(this.view.childNodes[0] instanceof AdminProjectView);
      assert(this.view.childNodes[1] instanceof AdminFormsView);
    },

    "showAdminForm": function() {
      var form = sinon.createStubInstance(FormModel);
      form.getId.returns(123);
      var questions = sinon.createStubInstance(QuestionsModel);
      questions.toArray.returns([]);
      form.getQuestions.returns(questions);

      this.stub(this.store, 'find').yieldsTo('success', form);
      this.stub(AdminQuestionsView.prototype, 'setFormId');

      this.view.showAdminForm("123");

      assert.calledWith(this.store.find, 'forms', 123, FormModel);
      assert.calledWith(this.store.findAll, 'questions', questions, QuestionModel,
        sinon.match.has('filter', {form_id: 123}));
      assert.calledWith(this.store.addSetModel, 'questions', questions);
      assert(this.view.childNodes[0] instanceof AdminFormView);
      assert(this.view.childNodes[1] instanceof AdminQuestionsView);
      assert.calledWith(AdminQuestionsView.prototype.setFormId, 123);
    },
  });
});
