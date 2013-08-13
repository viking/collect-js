define([
  'lib/maria',
  'models/forms'
], function(maria, FormsModel) {
  var namespace = {};

  maria.Model.subclass(namespace, 'ProjectModel', {
    properties: {
      _id: null,
      _name: '',
      _forms: null,

      getAttributes: function() {
        return({
          id: this._id,
          name: this._name
        });
      },
      setId: function(value) {
        this._id = value;
        this.dispatchEvent({type: 'change'});
      },
      getId: function() {
        return this._id;
      },
      setName: function(value) {
        if (value != this._name) {
          this._name = value;
          this.dispatchEvent({type: 'change'});
        }
      },
      getName: function() {
        return this._name;
      },

      /* associations */
      getForms: function() {
        if (!this._forms) {
          this._forms = new FormsModel();
        }
        return this._forms;
      }
    }
  });

  return namespace.ProjectModel;
});
