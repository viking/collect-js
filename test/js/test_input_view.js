require(['lib/maria', 'input_view'], function(maria, InputView) {
  function newSubclass(options) {
    var namespace = {};
    InputView.subclass(namespace, 'FooInputView', options);
    return namespace.FooInputView;
  }

  buster.testCase('InputView', {
    setUp: function() {
      this.klass = newSubclass({
        template: '<div><input name="foo"/><input name="bar"/><select name="baz"><option>qux</option><option>corge</option></select><textarea name="grault"></textarea><input class="submit" type="submit"/></div>'
      });
      this.view = new this.klass();
    },

    "get values": function() {
      var inputs = this.view.findAll('input');
      inputs[0].value = 'foo';
      inputs[1].value = 'bar';
      this.view.find('select').selectedIndex = 1;
      this.view.find('textarea').value = "stuff goes here";
      assert.equals(this.view.getValues(), {
        foo: 'foo', bar: 'bar', baz: 'corge',
        grault: 'stuff goes here'
      });
    },

    "get values with invalid selectedIndex": function() {
      this.view.find('select').selectedIndex = 5;
      var values = this.view.getValues();
      assert.equals(values.baz, null);
    },

    "reset dialog": function() {
      var input = this.view.find('input');
      input.value = 'foo';
      var select = this.view.find('select');
      select.selectedIndex = 1;
      var textarea = this.view.find('textarea');
      textarea.value = 'junk';

      this.view.reset();
      assert.equals(input.value, '');
      assert.equals(select.selectedIndex, 0);
      assert.equals(textarea.value, '');
    },

    "display errors": function() {
      this.view.displayErrors({foo: ['error 1'], baz: ['error 2'], grault: ['error 3']});
      assert.equals(this.view.find('input').getAttribute('class'), 'error');
      assert.equals(this.view.find('select').getAttribute('class'), 'error');
      assert.equals(this.view.find('textarea').getAttribute('class'), 'error');
    },

    "reset clears errors": function() {
      this.view.displayErrors({foo: ['error 1'], baz: ['error 2'], grault: ['error 3']});
      this.view.reset();
      refute(this.view.find('.error'));
    },

    "don't double add error class": function() {
      this.view.displayErrors({foo: ['error 1'], baz: ['error 2'], grault: ['error 3']});
      this.view.displayErrors({foo: ['error 1'], baz: ['error 2'], grault: ['error 3']});
      assert.equals(this.view.find('input').getAttribute('class'), 'error');
      assert.equals(this.view.find('select').getAttribute('class'), 'error');
      assert.equals(this.view.find('textarea').getAttribute('class'), 'error');
    }
  })
});
