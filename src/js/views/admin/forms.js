define([
  'lib/maria',
  'templates/admin/forms',
  'views/admin/forms_list',
  'views/admin/forms_input',
  'route_helper'
], function(maria, AdminFormsTemplate, AdminFormsListView, AdminFormsInputView, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminFormsView', {
    controllerConstructor: null,
    template: AdminFormsTemplate.source,
    constructor: function(model) {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);

      this._listView = new AdminFormsListView(model);
      this.appendChild(this._listView);
      this._inputView = new AdminFormsInputView(model);
      this.appendChild(this._inputView);
    },
    properties: {
      _listView: null,
      _inputView: null,
      setProjectId: function(projectId) {
        this._inputView.setProjectId(projectId);
      }
    }
  });

  return namespace.AdminFormsView;
});
