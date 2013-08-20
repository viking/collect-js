define([
  'lib/maria',
  'controllers/admin/projects_input',
  'templates/admin/projects_input',
  'route_helper'
], function(maria, AdminProjectsInputController, AdminProjectsInputTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminProjectsInputView', {
    controllerConstructor: AdminProjectsInputController,
    template: AdminProjectsInputTemplate.source,
    constructor: function() {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    uiActions: {
      'click input.create': 'onSubmit'
    },
    properties: {
      reset: function() {
        this.find('input').value = '';
        var elts = this.findAll('.error');
        for (var i = 0; i < elts.length; i++) {
          elts[i].setAttribute('class', elts[i].getAttribute('class').replace(/ *error */, ''));
        }
      },

      getValues: function() {
        return({name: this.find('input').value});
      },

      displayErrors: function(errors) {
        for (key in errors) {
          var elt = this.find('.' + key);
          elt.setAttribute('class', elt.getAttribute('class') + ' error');
        }
      }
    }
  });

  return namespace.AdminProjectsInputView;
});
