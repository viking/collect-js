define([
  'lib/maria',
  'models/questions'
], function(maria, QuestionsModel) {
  var namespace = {};

  maria.Model.subclass(namespace, 'FormModel', {
    properties: {
      _id: null,
      _name: '',
      _projectId: null,
      _questions: null,

      attributes: function() {
        return({
          id: this._id,
          name: this._name,
          project_id: this._projectId
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
      setProjectId: function(value) {
        if (value != this._projectId) {
          this._projectId = value;
          this.dispatchEvent({type: 'change'});
        }
      },
      getProjectId: function() {
        return this._projectId;
      },

      /* associations */
      getQuestions: function() {
        if (!this._questions) {
          this._questions = new QuestionsModel();
        }
        return this._questions;
      }
    }
  });

  return namespace.FormModel;
});
