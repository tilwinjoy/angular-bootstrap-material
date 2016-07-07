angular.module('angularBootstrapMaterial')
  .directive('abmLabel', [function () {
    return {
      /*templateUrl: 'templates/label.html',
    replace: true,*/
      require: '^abmFormGroup',
      scope: {
        type: '@'
      },
      link: function (scope, element, attrs, formGroupCtrl) {
        if (!formGroupCtrl) // if used outside a form group for some reason, do nothing
          return false;
        var className = 'label-' + (attrs.type || 'static'); // TBD see if this can be an array
        if (!element.hasClass('control-label')) // TBD checkif the condition is unnecessary
          element.addClass('control-label')
        formGroupCtrl.addClass(className);
      }
    }
  }])
