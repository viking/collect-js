define([
  'lib/maria',
  'controllers/admin/projects_form',
  'templates/admin/projects_form',
  'route_helper'
], function(maria, AdminProjectsFormController, AdminProjectsFormTemplate, RouteHelper) {
  var namespace = {};

  maria.ElementView.subclass(namespace, 'AdminProjectsFormView', {
    controllerConstructor: AdminProjectsFormController,
    template: AdminProjectsFormTemplate.source,
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

  return namespace.AdminProjectsFormView;
});
