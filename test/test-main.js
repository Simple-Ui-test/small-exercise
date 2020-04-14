var tests = [];
var modules = [];
var SPEC_REGEXP = /Spec\.js$/;
var VIEWMODEL_REGEXP = /viewModels\//;
var JS_REGEXP = /\.js$/;
 
var jsToModule = function (path) {
    return path.replace(/^\/base\/src\/js\//, '').replace(/\.js$/, '');
};
 
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (SPEC_REGEXP.test(file)) {
      tests.push(file);
    }
    else if (VIEWMODEL_REGEXP.test(file) && JS_REGEXP.test(file)) {
        modules.push(jsToModule(file));
    }
  }
}
 
var startTest= function(){
  //Load the modules before calling karma start.
  require(modules, function () { 
    window.__karma__.start()
  })
}
 
function _ojIsIE11() {
  var nAgt = navigator.userAgent;
  return nAgt.indexOf('MSIE') !== -1 || !!nAgt.match(/Trident.*rv:11./);
};
var _ojNeedsES5 = _ojIsIE11();

requirejs.config({
    baseUrl: '/base/src/js',
 
 paths:
  {
    'knockout': 'libs/knockout/knockout-3.5.0.debug',
    'jquery': 'libs/jquery/jquery-3.4.1',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.1',
    'hammerjs': 'libs/hammer/hammer-2.0.8',
    'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.1',
    'ojs': 'libs/oj/v8.1.0/debug' + (_ojNeedsES5 ? '_es5' : ''),
    'ojL10n': 'libs/oj/v8.1.0/ojL10n',
    'ojtranslations': 'libs/oj/v8.1.0/resources',
    'text': 'libs/require/text',
    'signals': 'libs/js-signals/signals',
    'customElements': 'libs/webcomponents/custom-elements.min',
    'proj4': 'libs/proj4js/dist/proj4-src',
    'css': 'libs/require-css/css',
    'touchr': 'libs/touchr/touchr',
    'corejs' : 'libs/corejs/shim',
    'regenerator-runtime' : 'libs/regenerator-runtime/runtime'
  },
 
  shim:
  {
    'jquery':
    {
      exports: ['jQuery', '$']
    }
  },
    deps: tests,
    callback: startTest
});