define([
  'lib/test',
  'models/form',
  'views/admin/form'
], function(test, FormModel, AdminFormView) {
  return new test.Suite("AdminFormView", {
    setUp: function() {
      this.form = new FormModel();
      this.form.setName("foo");
      this.view = new AdminFormView(this.form);
    },

    "inserts name": function() {
      var span = this.view.find('span.name');
      this.assertEquals(span.innerHTML, "foo");
    },

    "updates on change": function() {
      this.view.build();
      this.form.setName("bar");
      var span = this.view.find('span.name');
      this.assertEquals(span.innerHTML, "bar");
    }
  });
});
