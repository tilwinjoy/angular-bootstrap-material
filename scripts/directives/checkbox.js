angular.module('angularBootstrapMaterial')
    .directive('abmCheckbox', function(abmConfig) {
        return {
            scope: {
                label: '@'
            },
            transclude: true,
            templateUrl: 'templates/checkbox.html',
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(function(clone, scope) {
                    element.find('abm-transclude-slot-checkbox').replaceWith(clone);
                }, null);
            }
        }
    });