define([
  'lib/maria',
  'models/projects',
  'models/project',
  'models/form',
  'models/question',
  'views/projects',
  'views/project',
  'views/admin/projects',
  'views/admin/project',
  'views/admin/forms',
  'views/admin/form',
  'views/admin/questions',
  'controllers/app',
  'templates/app'
], function(maria, ProjectsModel, ProjectModel, FormModel, QuestionModel, ProjectsView, ProjectView, AdminProjectsView, AdminProjectView, AdminFormsView, AdminFormView, AdminQuestionsView, AppController, AppTemplate) {

  var namespace = {};

  maria.ElementView.subclass(namespace, 'AppView', {
    template: AppTemplate.source,
    controllerConstructor: AppController,
    uiActions: {
      'click section.app': 'onNavigate'
    },
    properties: {
      _store: null,
      setStore: function(store) {
        this._store = store;
      },
      buildUIActions: function() {
        maria.ElementView.prototype.buildUIActions.apply(this, arguments);
        var window = this.getController().getWindow();
        maria.on(window, 'popstate', this, 'onPopState');
      },
      onPopState: function(evt) {
        this.getController().route();
      },
      urlFor: function(url) {
        return this.getController().urlFor(url);
      },
      showProjects: function() {
        this._showProjects(false);
      },
      showProject: function(projectId) {
        var self = this;
        this._store.find('projects', parseInt(projectId), ProjectModel, {
          success: function(project) {
            self._startTransition();
            self.appendChild(new ProjectView(project));
            self._endTransition();
          }
        });
      },
      showAdminProjects: function() {
        this._showProjects(true);
      },
      showAdminProject: function(projectId) {
        var self = this;
        this._store.find('projects', parseInt(projectId), ProjectModel, {
          success: function(project) {
            self._startTransition();
            self.appendChild(new AdminProjectView(project));

            var forms = project.getForms();
            self._store.findAll('forms', forms, FormModel, {
              filter: {project_id: project.getId()},
              success: function() {
                self._store.addSetModel('forms', forms);
              }
            });

            var formsView = new AdminFormsView(forms);
            formsView.setProjectId(project.getId());
            self.appendChild(formsView);
            self._endTransition();
          },
        });
      },
      showAdminForm: function(formId) {
        var self = this;
        this._store.find('forms', parseInt(formId), FormModel, {
          success: function(form) {
            self._startTransition();
            self.appendChild(new AdminFormView(form));

            var questions = form.getQuestions();
            self._store.findAll('questions', questions, QuestionModel, {
              filter: {form_id: form.getId()},
              success: function() {
                self._store.addSetModel('questions', questions);
              }
            });
            var questionsView = new AdminQuestionsView(questions);
            questionsView.setFormId(form.getId());
            self.appendChild(questionsView);
            self._endTransition();
          },
        });
      },
      _startTransition: function() {
        this.find('.loading').style.display = 'block';
        for (var i = this.childNodes.length-1; i >= 0; i--) {
          this.removeChild(this.childNodes[i]);
        }
      },
      _endTransition: function() {
        this.find('.loading').style.display = 'none';
      },
      _showProjects: function(admin) {
        var projects = new ProjectsModel();
        var self = this;
        this._store.findAll('projects', projects, ProjectModel, {
          success: function() {
            self._store.addSetModel('projects', projects);
          }
        });

        var childView = admin ? AdminProjectsView : ProjectsView;
        this._startTransition();
        this.appendChild(new childView(projects));
        this._endTransition();
      },
    }
  });

  return namespace.AppView;
});
