angular.module('angularBootstrapMaterial').factory('isChar', function () {
  return function _isChar(evt) {
    if (typeof evt.which == "undefined") {
      return true;
    } else if (typeof evt.which == "number" && evt.which > 0) {
      return (!evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8 // backspace
        && evt.which != 9 // tab
        && evt.which != 13 // enter
        && evt.which != 16 // shift
        && evt.which != 17 // ctrl
        && evt.which != 20 // caps lock
        && evt.which != 27 // escape
      );
    }
    return false;
  }
});
