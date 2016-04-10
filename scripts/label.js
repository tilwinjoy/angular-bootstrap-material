angular.module('angularBootstrapMaterial')
    .directive('abmLabel', function ($compile) {
        return {
            template: '<label class="control-label" ng-transclude></label>',
            replace: true,
            transclude: true,
            link: function (scope, element, attrs, ctrl, transclude) {}
        }
    })