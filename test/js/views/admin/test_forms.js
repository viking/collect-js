define([
  'lib/test',
  'lib/sinon',
  'models/forms',
  'views/admin/forms_list',
  'views/admin/forms_input',
  'views/admin/forms'
], function(test, sinon, FormsModel, AdminFormsListView, AdminFormsInputView, AdminFormsView) {
  return new test.Suite('AdminFormsView', {
    setUp: function() {
      this.forms = new FormsModel();
      this.view = new AdminFormsView(this.forms);
    },

    "has list and form as children": function() {
      this.assert(this.view.childNodes[0] instanceof AdminFormsListView);
      this.assert(this.view.childNodes[1] instanceof AdminFormsInputView);
    },

    "setting project id": sinon.test(function() {
      var inputView = this.view.childNodes[1];
      this.stub(inputView, 'setProjectId');
      this.view.setProjectId(123);
      this.assertCalledWith(inputView.setProjectId, 123);
    })
  });
});
