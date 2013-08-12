define(['models/form', 'views/admin/form'], function(FormModel, AdminFormView) {
  buster.testCase("AdminFormView", {
    setUp: function() {
      this.form = new FormModel();
      this.form.setName("foo");
      this.view = new AdminFormView(this.form);
    },

    "inserts name": function() {
      var span = this.view.find('span.name');
      assert.equals(span.innerHTML, "foo");
    },

    "updates on change": function() {
      this.view.build();
      this.form.setName("bar");
      var span = this.view.find('span.name');
      assert.equals(span.innerHTML, "bar");
    }
  });
});
