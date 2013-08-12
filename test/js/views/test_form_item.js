define(['models/form', 'views/form_item'], function(FormModel, FormItemView) {
  buster.testCase('FormItemView', {
    setUp: function() {
      this.form = new FormModel();
      this.form.setId(1);
      this.form.setName("foo");
      this.form.setProjectId(1);
      this.view = new FormItemView(this.form);
    },

    "inserts name": function() {
      var a = this.view.find('a');
      assert.equals(a.innerHTML, "foo");
    },

    "inserts href": function() {
      var a = this.view.find('a');
      assert.equals(a.getAttribute('href'), "/forms/1");
    },

    "updates on change": function() {
      this.view.build();
      this.form.setName("bar");
      var a = this.view.find('a');
      assert.equals(a.innerHTML, "bar");
    },
  });
});
