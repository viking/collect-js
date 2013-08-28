define([
  'lib/test',
  'models/form',
  'views/admin/form_item'
], function(test, FormModel, AdminFormItemView) {
  return new test.Suite('AdminFormItemView', {
    setUp: function() {
      this.form = new FormModel();
      this.form.setId(1);
      this.form.setName("foo");
      this.form.setProjectId(1);
      this.view = new AdminFormItemView(this.form);
    },

    "inserts name": function() {
      var a = this.view.find('a');
      this.assertEquals(a.innerHTML, "foo");
    },

    "inserts href": function() {
      var a = this.view.find('a');
      this.assertEquals(a.getAttribute('href'), "/admin/forms/1");
    },

    "updates on change": function() {
      this.view.build();
      this.form.setName("bar");
      var a = this.view.find('a');
      this.assertEquals(a.innerHTML, "bar");
    },
  });
});
