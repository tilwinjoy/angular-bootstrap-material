angular.module('angularBootstrapMaterial')
  .directive('abmCheckbox', [function () {
    return {
      scope: {
        label: '@'
      },
      transclude: true,
      require: ['?^abmFormGroup'],
      templateUrl: 'templates/checkbox.html',
      link: function ($scope, $element, attrs, ctrls, transclude) {
        var input;
        var formGroup = ctrls[0];
        transclude(function (clone, $scope) {
          $element.find('abm-transclude-slot-checkbox').replaceWith(clone);
        }, null);
        if (formGroup) {
          var $input = $element.find('input');
          input = $input.controller('ngModel');
          $element.find('label').on('mouseenter mouseleave', function (event) {
            if ($input.prop('disabled')) return;
            formGroup.toggleFocus(event.type == 'mouseover');
          });
          if (input) {
            $scope.$watch(function () {
              return input.$invalid;
            }, formGroup.toggleError);
          }
        }
      }
    }
    }]);
