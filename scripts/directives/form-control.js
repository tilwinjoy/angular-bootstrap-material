angular.module('angularBootstrapMaterial')
    .directive('abmFormControl', ['isChar', function(isChar) {
        return {
            /*templateUrl: 'templates/input.html',
    replace: true,*/
            scope: {},
            require: ["ngModel", '^abmFormGroup'],
            compile: function() {
                return function($scope, $element, attrs, ctrls) {
                    var input = ctrls[0];
                    var formGroup = ctrls[1];
                    if (!$element.hasClass('form-control')) // TBD checkif the condition is unnecessary
                        $element.addClass('form-control')
                    if (!$element.attr('id')) // TBD checkif the condition is unnecessary
                        $element.attr('id', 'form-control-' + $scope.$id);
                    formGroup.registerControl($scope);
                    $element.on("input paste", function(e) {
                            if (isChar(e)) {
                                formGroup.toggleEmpty(true);
                            }
                        }).on("focus", function() {
                            formGroup.toggleFocus(true);
                        })
                        .on("blur", function() {
                            formGroup.toggleFocus(false);
                        });

                    $scope.$watch(function() {
                        return input.$invalid;
                    }, formGroup.toggleError);
                    $scope.$watch(attrs.ngModel, formGroup.toggleEmpty);
                }
            }
        }
    }]);