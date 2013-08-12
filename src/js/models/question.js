define(['lib/maria'], function(maria) {
  var namespace = {};

  maria.Model.subclass(namespace, 'QuestionModel', {
    properties: {
      _id: null,
      _name: '',
      _type: '',
      _prompt: '',
      _formId: null,
      attributes: function() {
        return({
          id: this._id,
          name: this._name,
          type: this._type,
          prompt: this._prompt,
          form_id: this._formId
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
      setType: function(value) {
        if (value != this._type) {
          this._type = value;
          this.dispatchEvent({type: 'change'});
        }
      },
      getType: function() {
        return this._type;
      },
      setPrompt: function(value) {
        if (value != this._prompt) {
          this._prompt = value;
          this.dispatchEvent({type: 'change'});
        }
      },
      getPrompt: function() {
        return this._prompt;
      },
      setFormId: function(value) {
        if (value != this._formId) {
          this._formId = value;
          this.dispatchEvent({type: 'change'});
        }
      },
      getFormId: function() {
        return this._formId;
      },
    }
  });

  return namespace.QuestionModel;
});
