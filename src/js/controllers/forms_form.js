maria.Controller.subclass(Collect, 'FormsFormController', {
  properties: {
    onSubmit: function() {
      var view = this.getView();
      var values = view.getValues();
      var form = new Collect.FormModel();
      form.setName(values.name);
      form.setProjectId(values.project_id);
      this.getModel().add(form);
      view.reset();
    }
  }
});
