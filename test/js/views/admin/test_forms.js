define([
  'models/forms',
  'views/admin/forms_list',
  'views/admin/forms_input',
  'views/admin/forms'
], function(FormsModel, AdminFormsListView, AdminFormsInputView, AdminFormsView) {
  buster.testCase('AdminFormsView', {
    setUp: function() {
      this.forms = new FormsModel();
      this.view = new AdminFormsView(this.forms);
    },

    "has list and form as children": function() {
      assert(this.view.childNodes[0] instanceof AdminFormsListView);
      assert(this.view.childNodes[1] instanceof AdminFormsInputView);
    },

    "setting project id": function() {
      var inputView = this.view.childNodes[1];
      this.stub(inputView, 'setProjectId');
      this.view.setProjectId(123);
      assert.calledWith(inputView.setProjectId, 123);
    }
  });
});
