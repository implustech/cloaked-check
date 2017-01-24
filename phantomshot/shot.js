var webpage = require('webpage')

const LONG_PAUSE = 50000;
const SHORT_PAUSE = 1500;
const VIEWPORT_H = 568;
const VIEWPORT_W = 320;

// base demo
/*var start_url = 'http://192.168.1.30:3000/pluginArray.html';
page.open(start_url, function(status) {
  console.log('ScreenShoting...')
  console.log("Status: " + status);
  if(status === "success") {
  	setTimeout(function() {
	  page.render('screenshot-pluginArray.png');
  	}, SHORT_PAUSE)
  }
});*/

var pagelist = [
  'deviceMotionEvent',
  'pluginArray',
  'alertIgnore',
  'errorTrack',
  'functionBind',
  'phantomjs',
  'pluginArray',
  'regExp',
  'worker',
  'outerSize'
];

var count = 0;

function shotPage(pageName) {
  var page = webpage.create();
  page.onConsoleMessage = function(msg) {
	console.log('Page console log: ' + msg);
  };
  //viewportSize being the actual size of the headless browser
  page.viewportSize = { width: VIEWPORT_W, height: VIEWPORT_H };
  //the clipRect is the portion of the page you are taking a screenshot of
  page.clipRect = { top: 0, left: 0, width: VIEWPORT_W, height: VIEWPORT_H };

  // throw new Error("oops");
  var start_url = 'http://192.168.1.30:3000/' + pageName + '.html';
  console.info('loading.. ', start_url)
  page.open(start_url, function(status) {
    console.log('ScreenShoting...', 'screenshot-' + pageName + '.png')
    if (status === "success") {
      setTimeout(function() {
        page.render('./views/screenshot-' + pageName + '.png');
        console.log("Status: " + status);
        count = count + 1;
        console.log(count)
        if (count === pagelist.length) {
		  phantom.exit();
		}
      }, SHORT_PAUSE)
    }
  });
}

for (var i = 0; i < pagelist.length; i++) {
  try {
    shotPage(pagelist[i])
  } catch (ex) {
    console.error("Running exception: ", ex.message);
  }
}
