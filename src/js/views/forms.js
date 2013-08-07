maria.ElementView.subclass(Collect, 'FormsView', {
  constructor: function(model) {
    maria.ElementView.apply(this, arguments);
    Collect.RouteHelper.mixin(this);

    this._listView = new Collect.FormsListView(model);
    this.appendChild(this._listView);
    this._formView = new Collect.FormsFormView(model);
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
