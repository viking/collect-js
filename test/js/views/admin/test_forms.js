define([
  'models/forms',
  'views/admin/forms_list',
  'views/admin/forms_form',
  'views/admin/forms'
], function(FormsModel, AdminFormsListView, AdminFormsFormView, AdminFormsView) {
  buster.testCase('AdminFormsView', {
    setUp: function() {
      this.forms = new FormsModel();
      this.view = new AdminFormsView(this.forms);
    },

    "has list and form as children": function() {
      assert(this.view.childNodes[0] instanceof AdminFormsListView);
      assert(this.view.childNodes[1] instanceof AdminFormsFormView);
    },

    "setting project id": function() {
      var formView = this.view.childNodes[1];
      this.stub(formView, 'setProjectId');
      this.view.setProjectId(123);
      assert.calledWith(formView.setProjectId, 123);
    }
  });
});
