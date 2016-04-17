angular.module('angularBootstrapMaterial')
    .directive('abmToggle', function (abmConfig) {
        return {
            scope: {
                label: '@'
            },
            transclude: true,
            templateUrl: 'templates/toggle.html',
            link: function (scope, element, attrs, ctrl, transclude) {
                transclude(function (clone, scope) {
                    element.find('abm-transclude-slot-toggle').replaceWith(clone);
                }, null);
            }
        }
    });