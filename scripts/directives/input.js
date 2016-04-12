angular.module('angularBootstrapMaterial')
    .directive('abmInput', ['isChar', function (isChar) {
        return {
            templateUrl: 'templates/input.html',
            replace: true,
            scope: {
                errorMessages: '='
            },
            require: ["ngModel", '^abmFormGroup'],
            compile: function () {
                return function ($scope, $element, attrs, ctrls) {
                    var input = ctrls[0];
                    var formGroup = ctrls[1];
                    formGroup.registerControl($scope);
                    $element.on("input paste", function (e) {
                            if (isChar(e)) {
                                formGroup.toggleEmpty(true);
                            }
                        }).on("focus", function () {
                            formGroup.toggleFocus(true);
                        })
                        .on("blur", function () {
                            formGroup.toggleFocus(false);
                        });

                    $scope.$watch(function () {
                        return input.$invalid;
                    }, formGroup.toggleError);
                    $scope.$watch(attrs.ngModel, formGroup.toggleEmpty);
                }
            }
        }
    }]);