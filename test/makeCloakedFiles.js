var fs = require('fs');
var cloakedHtmlBuilder = require('../middlewares/cloakedHtmlBluider')

var pagelist = [
  'deviceMotionEvent',
  'pluginArray',
  'alertIgnore',
  'errorTrack',
  'functionBind',
  'phantomjs',
  'pluginArray',
  'regExp',
  'worker'
];


var count = 0;

function makeHtml(pageName) {
  var fileName = './auto_' + pageName + '.html';
  var content = cloakedHtmlBuilder([pageName], 'compliant', 'aggressive')
  fs.writeFile(fileName, content, (err) => {
    if (err) throw err;
    count = count + 1;
    console.log(count)
    if (count === pagelist.length) {
      process.exit();
    }
  });
}


for (var i = 0; i < pagelist.length; i++) {
  try {
    makeHtml(pagelist[i])
  } catch (ex) {
    console.error("Running exception: ", ex.message);
  }
}
