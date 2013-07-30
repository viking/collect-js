maria.ElementView.subclass(Collect, 'ProjectsFormView', {
  uiActions: {
  },
  properties: {
    _dialogEl: null,

    buildTemplate: function() {
      var el = $.parseHTML(Collect.ProjectsFormTemplate)[0];
      var dialog =
        $(el).dialog({
          autoOpen: false,
          buttons: [{label: "Create"}, {label: "Cancel"}],
          create: function() {
            $(this).closest('.ui-dialog').
              find('button[label="Create"]').addClass('create');
          }
        });
      this._dialogEl = dialog[0];
      this._rootEl = dialog.closest('.ui-dialog')[0];
    },

    open: function() {
      $(this._getDialog()).dialog('open');
    },

    reset: function() {
      this.find('input').value = '';
    },

    getValues: function() {
      return({name: this.find('input').value});
    },

    _getDialog: function() {
      if (!this._dialogEl) {
        this.build();
      }
      return this._dialogEl;
    }
  }
});
