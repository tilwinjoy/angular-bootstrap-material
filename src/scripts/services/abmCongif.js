angular.module('angularBootstrapMaterial').factory('abmConfig', function () {
  var showErrors = true;
  var errorMap = {};
  return {

    toggleErrorState: function () {
      showErrors = !showErrors;
    },
    getErrorState: function () {
      return showErrors;
    },
    getErrors: function (error) {
      return errorMap;
    },
    setErrors: function (error) {
      if (error && error instanceof Object)
        angular.extend(errorMap, error);
    }
  }
});
