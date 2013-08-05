buster.testCase('AppView', {
  setUp: function() {
    this.store = new Collect.LocalStore();
    this.view = new Collect.AppView();
    this.view.setStore(this.store);
  },

  "showProjects": function() {
    this.stub(this.store, 'findAll');
    this.view.showProjects();
    assert.calledOnce(this.store.findAll);
    assert(this.view.find('ul.projects'));
    assert(this.view.find('section.projects-form'));
  }
});
