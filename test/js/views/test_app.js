define([
  'lib/test',
  'lib/sinon',
  'lib/maria',
  'persistence/local',
  'models/projects',
  'models/project',
  'models/forms',
  'models/form',
  'models/questions',
  'models/question',
  'views/projects',
  'views/project',
  'views/admin/projects',
  'views/admin/project',
  'views/admin/forms',
  'views/admin/form',
  'views/admin/questions',
  'views/app'
], function(test, sinon, maria, LocalStore, ProjectsModel, ProjectModel, FormsModel, FormModel, QuestionsModel, QuestionModel, ProjectsView, ProjectView, AdminProjectsView, AdminProjectView, AdminFormsView, AdminFormView, AdminQuestionsView, AppView) {
  return new test.Suite('AppView', {
    setUp: function() {
      this.store = new LocalStore();
      this.view = new AppView();
      this.view.setStore(this.store);
      sinon.stub(this.store, 'findAll').yieldsTo('success');
      sinon.stub(this.store, 'addSetModel');
    },

    "showProjects": function() {
      this.view.showProjects();
      this.assertCalledWith(this.store.findAll, 'projects', sinon.match.instanceOf(ProjectsModel), ProjectModel);
      this.assertCalledWith(this.store.addSetModel, 'projects', sinon.match.instanceOf(ProjectsModel));
      this.assert(this.view.childNodes[0] instanceof ProjectsView);
    },

    "showAdminProjects": function() {
      this.view.showAdminProjects();
      this.assertCalledWith(this.store.findAll, 'projects', sinon.match.instanceOf(ProjectsModel), ProjectModel);
      this.assertCalledWith(this.store.addSetModel, 'projects', sinon.match.instanceOf(ProjectsModel));
      this.assert(this.view.childNodes[0] instanceof AdminProjectsView);
    },

    "showAdminProject": sinon.test(function() {
      var project = sinon.createStubInstance(ProjectModel);
      project.getId.returns(123);
      var forms = sinon.createStubInstance(FormsModel);
      forms.toArray.returns([]);
      project.getForms.returns(forms);

      this.stub(this.store, 'find').yieldsTo('success', project);
      this.stub(AdminFormsView.prototype, 'setProjectId');

      this.view.showAdminProject("123");

      this.assertCalledWith(this.store.find, 'projects', 123, ProjectModel);
      this.assertCalledWith(this.store.findAll, 'forms', forms, FormModel,
        sinon.match.has('filter', {project_id: 123}));
      this.assertCalledWith(this.store.addSetModel, 'forms', forms);
      this.assert(this.view.childNodes[0] instanceof AdminProjectView);
      this.assert(this.view.childNodes[1] instanceof AdminFormsView);
      this.assertCalledWith(AdminFormsView.prototype.setProjectId, 123);
    }),

    "transition to showAdminProject": sinon.test(function() {
      var child = new maria.ElementView();
      this.view.appendChild(child);

      var project = sinon.createStubInstance(ProjectModel);
      project.getId.returns(123);
      var forms = sinon.createStubInstance(FormsModel);
      forms.toArray.returns([]);
      project.getForms.returns(forms);

      this.stub(this.store, 'find').yieldsTo('success', project);
      this.view.showAdminProject("123");
      this.assert(this.view.childNodes[0] !== child);
      this.assert(this.view.childNodes[0] instanceof AdminProjectView);
      this.assert(this.view.childNodes[1] instanceof AdminFormsView);
    }),

    "showAdminForm": sinon.test(function() {
      var form = sinon.createStubInstance(FormModel);
      form.getId.returns(123);
      var questions = sinon.createStubInstance(QuestionsModel);
      questions.toArray.returns([]);
      form.getQuestions.returns(questions);

      this.stub(this.store, 'find').yieldsTo('success', form);
      this.stub(AdminQuestionsView.prototype, 'setFormId');

      this.view.showAdminForm("123");

      this.assertCalledWith(this.store.find, 'forms', 123, FormModel);
      this.assertCalledWith(this.store.findAll, 'questions', questions, QuestionModel,
        sinon.match.has('filter', {form_id: 123}));
      this.assertCalledWith(this.store.addSetModel, 'questions', questions);
      this.assert(this.view.childNodes[0] instanceof AdminFormView);
      this.assert(this.view.childNodes[1] instanceof AdminQuestionsView);
      this.assertCalledWith(AdminQuestionsView.prototype.setFormId, 123);
    }),

    "showProject": sinon.test(function() {
      var project = sinon.createStubInstance(ProjectModel);
      project.getId.returns(123);
      this.stub(this.store, 'find').yieldsTo('success', project);
      this.view.showProject("123");

      this.assertCalledWith(this.store.find, 'projects', 123, ProjectModel);
      this.assert(this.view.childNodes[0] instanceof ProjectView);
    })
  });
});
