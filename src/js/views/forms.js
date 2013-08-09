define([
  'lib/maria',
  'templates/forms',
  'views/forms_list',
  'views/forms_form',
  'route_helper'
], function(maria, FormsTemplate, FormsListView, FormsFormView, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'FormsView', {
    controllerConstructor: null,
    template: FormsTemplate.source,
    constructor: function(model) {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);

      this._listView = new FormsListView(model);
      this.appendChild(this._listView);
      this._formView = new FormsFormView(model);
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

  return namespace.FormsView;
});
