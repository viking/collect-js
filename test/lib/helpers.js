function eventFire(el, etype){
  if (el.fireEvent) {
    (el.fireEvent('on' + etype));
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function stubNew(t, object, name, callback) {
  var func = object[name];
  var fake = function() {
    if (callback) {
      callback.call(t, this);
    }
    else {
      t.stub(this);
    }
  };
  fake.prototype = sinon.create(func.prototype);
  t.stub(object, name, fake);
}

function getInstance(object, name, n) {
  if (typeof(n) == 'undefined') {
    n = 0;
  }
  return object[name].getCall(n).thisValue;
}

function stubView(t, object, name, callback) {
  var cb = function(view) {
    if (callback) {
      t.stub(view, 'build');
      callback.call(t, view);
    }
    else {
      t.stub(view);
    }
    view.build.returns(document.createElement('DIV'));
  }
  stubNew(t, object, name, cb);
}
