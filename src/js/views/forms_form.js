maria.ElementView.subclass(Collect, 'FormsFormView', {
  constructor: function() {
    maria.ElementView.apply(this, arguments);
    Collect.RouteHelper.mixin(this);
  },
  uiActions: {
    'click input.create': 'onSubmit'
  },
  properties: {
    _projectId: null,

    setProjectId: function(projectId) {
      this._projectId = projectId;
    },

    reset: function() {
      this.find('input').value = '';
    },

    getValues: function() {
      return({name: this.find('input').value, project_id: this._projectId});
    },
  }
});
