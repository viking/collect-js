define([
  'lib/maria',
  'templates/questions',
  'views/questions_list',
  'views/questions_form',
  'route_helper'
], function(maria, QuestionsTemplate, QuestionsListView, QuestionsFormView, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'QuestionsView', {
    controllerConstructor: null,
    template: QuestionsTemplate.source,
    constructor: function(model) {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);

      this._listView = new QuestionsListView(model);
      this.appendChild(this._listView);
      this._formView = new QuestionsFormView(model);
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

  return namespace.QuestionsView;
});
