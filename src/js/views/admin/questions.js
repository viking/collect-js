define([
  'lib/maria',
  'templates/admin/questions',
  'views/admin/questions_list',
  'views/admin/questions_input',
  'route_helper'
], function(maria, AdminQuestionsTemplate, AdminQuestionsListView, AdminQuestionsInputView, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminQuestionsView', {
    controllerConstructor: null,
    template: AdminQuestionsTemplate.source,
    constructor: function(model) {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);

      this._listView = new AdminQuestionsListView(model);
      this.appendChild(this._listView);
      this._inputView = new AdminQuestionsInputView(model);
      this.appendChild(this._inputView);
    },
    properties: {
      _listView: null,
      _inputView: null,
      setFormId: function(formId) {
        this._inputView.setFormId(formId);
      }
    }
  });

  return namespace.AdminQuestionsView;
});
