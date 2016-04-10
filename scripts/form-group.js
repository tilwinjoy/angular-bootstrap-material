angular.module('angularBootstrapMaterial')
    .directive('abmFormGroup', function () {
        return {
            scope: {
                classList: '=',
                label: '@',
                placeholder: '@',
                error: '='
            },
            replace: true,
            transclude: {
                label: '?abmLabel',
                input: '?abmInput'
            },
            templateUrl: 'templates/form-group.html',
            controller: function ($scope, $element) {
                $scope.formControl = null;
                $scope.name = 'fg_' + $scope.$id;
                this.toggleFocus = function (state) {
                    $element.toggleClass("is-focused", state);
                };
                this.toggleEmpty = function (state) {
                    $element.toggleClass("is-empty", state);
                }
                this.toggleError = function (state) {
                    $element.toggleClass("has-error", state);
                }
                this.registerControl = function (scope) {
                    $scope.formControl = scope;
                }
            },
            link: function (scope, element, attrs, ctrl, transclude) {
                if (transclude.isSlotFilled('label')) {
                    var label = transclude(angular.noop, null, 'label');
                    element.find('label').replaceWith(label);
                }
                if (transclude.isSlotFilled('input')) {
                    var input = transclude(function (clone, scope) {
                        element.find('input').replaceWith(clone);
                    }, null, 'input');
                }
            }
        }
    });