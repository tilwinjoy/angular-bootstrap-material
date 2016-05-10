angular.module('angularBootstrapMaterial')
  .directive('abmToggle', [function () {
    return {
      scope: {
        label: '@'
      },
      transclude: true,
      require: '?^abmFormGroup',
      templateUrl: 'templates/toggle.html',
      link: function (scope, element, attrs, ctrl, transclude) {
        transclude(function (clone, scope) {
          element.find('abm-transclude-slot-toggle').replaceWith(clone);
        }, null);

        if (ctrl) {
          var $input = element.find('input');
          element.find('label').on('mouseenter mouseleave', function (event) {
            if ($input.prop('disabled')) return;
            ctrl.toggleFocus(event.type == 'mouseover');
          });
        }
      }
    }
  }]);
