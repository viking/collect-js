// Script path provided when executing PhantomJS, should be relative to the working directory
var relativeScriptPath = require('system').args[0];

var fs = require('fs');
var absoluteScriptPath = fs.absolute(relativeScriptPath);
var absoluteScriptDir = absoluteScriptPath.substring(0, absoluteScriptPath.lastIndexOf('/'));

var page = require('webpage').create();
page.onConsoleMessage = function(msg, lineNum, sourceId) {
  if (msg == "QUIT") {
    phantom.exit();
  }
  else {
    console.log(msg);
  }
};
page.onError = function(msg, trace) {
  var msgStack = ['ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function + '")' : ''));
    });
  }
  console.error(msgStack.join('\n'));
  phantom.exit();
};
page.open('file://' + absoluteScriptDir + '/test.html', function(status) {
  if (status == 'fail') {
    console.error("failed to load the test page!");
    phantom.exit();
  }
});
