define([
  'lib/maria',
  'route_helper'
], function(maria, RouteHelper) {
  var ns = {};

  maria.ElementView.subclass(ns, 'InputView', {
    constructor: function() {
      maria.ElementView.apply(this, arguments);
      RouteHelper.mixin(this);
    },
    properties: {
      getValues: function() {
        var values = {};

        var inputs = this._findAllInputs();
        for (var i = 0; i < inputs.length; i++) {
          var input = inputs[i];
          if (input.getAttribute('name') != null) {
            values[input.getAttribute('name')] = input.value;
          }
        }

        var selects = this.findAll('select');
        for (var i = 0; i < selects.length; i++) {
          var select = selects[i];
          if (select.getAttribute('name') != null) {
            var option = select.options[select.selectedIndex];
            values[select.getAttribute('name')] = option ? option.value : null;
          }
        }

        return values;
      },

      reset: function() {
        var inputs = this._findAllInputs();
        for (var i = 0; i < inputs.length; i++) {
          var type = inputs[i].getAttribute('type');
          if (type != 'submit' && type != 'button') {
            inputs[i].value = '';
            this._removeErrorClass(inputs[i]);
          }
        }

        var selects = this.findAll('select');
        for (var i = 0; i < selects.length; i++) {
          selects[i].selectedIndex = 0;
          this._removeErrorClass(selects[i]);
        }
      },

      displayErrors: function(errors) {
        var elements = this._findAllInputs();
        var selects = this.findAll('select');
        elements.push.apply(elements, selects);

        for (var i = 0; i < elements.length; i++) {
          var name = elements[i].getAttribute('name');
          if (name && errors.hasOwnProperty(name)) {
            this._addErrorClass(elements[i]);
          }
        }
      },

      _findAllInputs: function() {
        var inputs = this.findAll('input');
        var textareas = this.findAll('textarea');
        inputs.push.apply(inputs, textareas);
        return inputs;
      },

      _addErrorClass: function(elt) {
        var classAttr = elt.getAttribute('class');
        if (classAttr && !classAttr.match(/ *error */)) {
          classAttr += ' error';
        }
        else {
          classAttr = 'error';
        }
        elt.setAttribute('class', classAttr);
      },

      _removeErrorClass: function(elt) {
        var classAttr = elt.getAttribute('class');
        if (classAttr) {
          elt.setAttribute('class', classAttr.replace(/ *error */, ''));
        }
      }
    }
  });

  ns.InputView.subclass = function() {
    maria.ElementView.subclass.apply(this, arguments);
  };

  return ns.InputView;
});
