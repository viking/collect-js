define([
  'lib/maria',
  'templates/admin/questions',
  'views/admin/questions_list',
  'views/admin/questions_form',
  'route_helper'
], function(maria, AdminQuestionsTemplate, AdminQuestionsListView, AdminQuestionsFormView, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminQuestionsView', {
    controllerConstructor: null,
    template: AdminQuestionsTemplate.source,
    constructor: function(model) {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);

      this._listView = new AdminQuestionsListView(model);
      this.appendChild(this._listView);
      this._formView = new AdminQuestionsFormView(model);
      this.appendChild(this._formView);
    },
    properties: {
      _listView: null,
      _formView: null,
      setFormId: function(formId) {
        this._formView.setFormId(formId);
      }
    }
  });

  return namespace.AdminQuestionsView;
});
