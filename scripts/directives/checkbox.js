angular.module('angularBootstrapMaterial')
    .directive('abmCheckbox', ['ripple', function (ripple) {
        return {
            scope: {
                label: '@'
            },
            transclude: true,
            require: '?^abmFormGroup',
            templateUrl: 'templates/checkbox.html',
            link: function (scope, element, attrs, ctrl, transclude) {
                transclude(function (clone, scope) {
                    element.find('abm-transclude-slot-checkbox').replaceWith(clone);
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