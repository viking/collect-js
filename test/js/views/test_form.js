define(['models/form', 'views/form'], function(FormModel, FormView) {
  buster.testCase("FormView", {
    setUp: function() {
      this.form = new FormModel();
      this.form.setName("foo");
      this.view = new FormView(this.form);
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
