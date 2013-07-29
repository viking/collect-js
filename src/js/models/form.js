maria.Model.subclass(Collect, 'FormModel', {
  properties: {
    _name: '',
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
