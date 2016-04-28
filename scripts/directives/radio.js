angular.module('angularBootstrapMaterial')
    .directive('abmRadio', function (abmConfig) {
        return {
            scope: {
                label: '@'
            },
            transclude: true,
            require: '?^abmFormGroup',
            templateUrl: 'templates/radio.html',
            link: function (scope, element, attrs, ctrl, transclude) {
                transclude(function (clone, scope) {
                    element.find('abm-transclude-slot-radio').replaceWith(clone);
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
    });