angular.module('angularBootstrapMaterial')
  .directive('abmRadio', [function () {
    return {
      scope: {
        label: '@'
      },
      transclude: true,
      require: '?^abmFormGroup',
      templateUrl: 'templates/radio.html',
      link: function ($scope, element, attrs, formGroup, transclude) {
        transclude(function (clone, $scope) {
          element.find('abm-transclude-slot-radio').replaceWith(clone);
        }, null);

        if (formGroup) {
          var $input = element.find('input');
          input = $input.controller('ngModel');
          element.find('label').on('mouseenter mouseleave', function (event) {
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
