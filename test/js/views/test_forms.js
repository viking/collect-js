define([
  'models/forms',
  'views/forms_list',
  'views/forms_form',
  'views/forms'
], function(FormsModel, FormsListView, FormsFormView, FormsView) {
  buster.testCase('FormsView', {
    setUp: function() {
      this.forms = new FormsModel();
      this.view = new FormsView(this.forms);
    },

    "has list and form as children": function() {
      assert(this.view.childNodes[0] instanceof FormsListView);
      assert(this.view.childNodes[1] instanceof FormsFormView);
    },

    "setting project id": function() {
      var formView = this.view.childNodes[1];
      this.stub(formView, 'setProjectId');
      this.view.setProjectId(123);
      assert.calledWith(formView.setProjectId, 123);
    }
  });
});
