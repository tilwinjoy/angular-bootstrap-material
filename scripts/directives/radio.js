angular.module('angularBootstrapMaterial')
    .directive('abmRadio', function(abmConfig) {
        return {
            scope: {
                label: '@'
            },
            transclude: true,
            templateUrl: 'templates/radio.html',
            link: function(scope, element, attrs, ctrl, transclude) {
                transclude(function(clone, scope) {
                    element.find('abm-transclude-slot-radio').replaceWith(clone);
                }, null);
            }
        }
    });