/**
 * DetectPhantomjs description
 * these strings may need to break as data model and insert into db
 *
 */
const DetectPhantomjs = `
  if (/PhantomJS/.test(window.navigator.userAgent) || /phantomjs/.test(window.navigator.userAgent.toLowerCase())
    || window.callPhantom || window._phantom || window.navigator.onLine
    || (window.outerWidth === 0 && window.outerHeight === 0)) {
    return true;
  }
  `
/**
 * This is an experimental technology Because this technology's specification has not stabilized,
 *  check the compatibility table for usage in various browsers.
 *   Also note that the syntax and behavior of an experimental technology
 *    is subject to change in future versions of browsers as the specification changes.
 */
const DetectDeviceMotionEvent = (compUrl) => `
  if (!window.DeviceMotionEvent) {
    return true;
  } else {
    window.addEventListener('devicemotion', function(event) {
      if (!event.interval) {
        window.location.replace("${compUrl}");
      }
    })
  }
  `
const DetectPluginArray = `
  if (!(window.navigator.plugins instanceof PluginArray)) {
    return true;
  }
  `
const DetectFunctionBind = `
  if (!Function.prototype.bind) {
    return true;
  }
  try {
    if (Function.prototype.bind.toString().replace(/bind/g, 'Error') != Error.toString()) {
      return true;
    }
    if (Function.prototype.toString.toString().replace(/toString/g, 'Error') != Error.toString()) {
      return true;
    }
  } catch (ex) {
    return true;
  }
  `
const DetectErrorTrack = `
  if (document.querySelectorAll('html') === true) {
    return true;
  }
  `

const DetectAlertIgnore = `
  var start = Date.now();
  alert('Click Ok to continue');
  var elapse = Date.now() - start;
  if (elapse < 1000 / 15) {
    return true;
  } else {
    return false;
  }
  `

const DetectWorkerType = `
  if (typeof Worker == "object") {
    return true;
  }
  `

const DetectRegExp = `
  if (/^\\d{1,3}(\\.\\d{1,3})?$/.test("11.23") === false || (new RegExp(/^\\d{1,3}(\\.\\d{1,3})?$/).test("22.24")) === false) {
    return true;
  }
  `

let detectCode = {
  deviceMotionEvent: DetectDeviceMotionEvent,
  phantomjs: DetectPhantomjs,
  functionBind: DetectFunctionBind,
  pluginArray: DetectPluginArray,
  errorTrack: DetectErrorTrack,
  alertIgnore: DetectAlertIgnore,
  worker: DetectWorkerType,
  regExp: DetectRegExp
}


module.exports = (checkList, compLdid, aggrLdid) => {
  let compUrl = `/${compLdid}`,
      aggrUrl = `/${aggrLdid}`

  let checkCode = ''
  checkList.forEach(point => {
    if (detectCode[point]) {
      if ('deviceMotionEvent' === point) {
        checkCode = checkCode.concat(detectCode[point](compUrl))
      } else {
        checkCode = checkCode.concat(detectCode[point])
      }
    }
  })


  let cloakedTemplate = `
  <script>
    function indexOfString(a, b) {
      var la = a.length;
      var lb = b.length;
      outer:
          for (var i = 0; i <= la - lb; i++) {
            for (var j = 0; j < lb; j++) {
              if (b.charAt(j) !== a.charAt(i + j)) {
                continue outer;
              }
            }
            return i;
          }
      return -1;
    }
    var html = document.querySelectorAll('html');
    var oldQSA = document.querySelectorAll;
    Document.prototype.querySelectorAll = Element.prototype.querySelectorAll = function () {
      var err;
      try {
        null[0]();
      } catch (e) {
        err = e;
      }
      if (indexOfString(err.stack, 'phantomjs') > -1) {
        return true;
      } else {
        return oldQSA.apply(this, arguments);
      }
    };
  </script>

  <script>
    function check() {
      var detectAll = function (argument) {
        ${ checkCode }
      };
      if (detectAll()) {
        window.location.replace("${compUrl}");
      } else {
        window.location.replace("${aggrUrl}");
      }
    }
    check();
  </script>
  `
  return cloakedTemplate
}
