define([
  'lib/maria',
  'templates/admin/forms',
  'views/admin/forms_list',
  'views/admin/forms_form',
  'route_helper'
], function(maria, AdminFormsTemplate, AdminFormsListView, AdminFormsFormView, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminFormsView', {
    controllerConstructor: null,
    template: AdminFormsTemplate.source,
    constructor: function(model) {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);

      this._listView = new AdminFormsListView(model);
      this.appendChild(this._listView);
      this._formView = new AdminFormsFormView(model);
      this.appendChild(this._formView);
    },
    properties: {
      _listView: null,
      _formView: null,
      setProjectId: function(projectId) {
        this._formView.setProjectId(projectId);
      }
    }
  });

  return namespace.AdminFormsView;
});
