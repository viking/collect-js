maria.Model.subclass(Collect, 'FormModel', {
  properties: {
    _id: null,
    _name: '',
    attributes: function() {
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
  }
});
