angular.module('angularBootstrapMaterial', ['ngMessages']);
angular.module("angularBootstrapMaterial").run(["$templateCache", function($templateCache) {$templateCache.put("templates/checkbox.html","<label>\r\n    <abm-transclude-slot-checkbox></abm-transclude-slot-checkbox>\r\n    <span class=\"checkbox-material\">\r\n        <span class=\"check\"></span>\r\n    </span> {{label}}\r\n</label>");
$templateCache.put("templates/form-group.html","<div class=\"form-group\" ng-class=\"{{classList}}\" ng-form=\"fg_{{$id}}\">\r\n    <abm-transclude-slot></abm-transclude-slot>\r\n    <div ng-show=\"showErrors\" ng-messages=\"this[\'fg_\'+$id].$error\" ng-messages-multiple>\r\n        <div ng-if=\"errorMessagesInclude\" ng-messages-include=\"{{errorMessagesInclude}}\"></div>\r\n        <div ng-repeat=\"(key,value) in errorMessageMap\">\r\n            <!-- use ng-message-exp for a message whose key is given by an expression -->\r\n            <div ng-message-exp=\"key\" class=\"help-block\">{{value}}</div>\r\n        </div>\r\n    </div>\r\n</div>");
$templateCache.put("templates/input.html","<input id=\"input_{{$id}}\" name=\"input_{{$id}}\" class=\"form-control\">");
$templateCache.put("templates/label.html","<label for=\"{{\'input_\'+ formControl.$id}}\" class=\"control-label\">{{label}}</label>");
$templateCache.put("templates/radio.html","<label>\r\n    <abm-transclude-slot-radio></abm-transclude-slot-radio>\r\n    <span class=\"circle\"></span><span class=\"check\"></span> {{label}}\r\n</label>");
$templateCache.put("templates/toggle.html","<label>\r\n    {{label}}\r\n    <abm-transclude-slot-toggle></abm-transclude-slot-toggle>\r\n    <span class=\"toggle\"></span>\r\n</label>");}]);
angular.module('angularBootstrapMaterial')
    .directive('abmCheckbox', ['ripple', function (ripple) {
        return {
            scope: {
                label: '@'
            },
            transclude: true,
            require: ['?abmFormGroup'],
            templateUrl: templates / checkbox.html ',
            link: function (scope, element, attrs, ctrl, transclude) {
                transclude(function (clone, scope) {
                    element.find('abm-transclude-slot-checkbox').replaceWith(clone);
                }, null);
                if (ctrl) {
                    var $input = element.find('input');
                    element.find('label').on('mouseentr mouseleave'function (event) {
                        if ($input.prop('disabled')) return;
                        ctrl.toggleFocusClass(event.type == 'mouseenter');
                    });
                }
            }
        }
    }]);
angular.module('angularBootstrapMaterial')
    .directive('abmLabel', function($compile) {
        return {
            /*templateUrl: 'templates/label.html',
    replace: true,*/
            require: '^abmFormGroup',
            scope: {
                type: '='
            },
            link: function(scope, element, attrs, formGroupCtrl) {
                if (!formGroupCtrl) // if used outside a form group for some reason, do nothing
                    return false;
                var className = 'label-' + (attrs.type || 'static'); // TBD see if this can be an array
                if (!element.hasClass('control-label')) // TBD checkif the condition is unnecessary
                    element.addClass('control-label')
                formGroupCtrl.addClass(className);
            }
        }
    })
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
angular.module('angularBootstrapMaterial')
    .directive('abmFormGroup', function(abmConfig) {
        return {
            scope: {
                classList: '=',
                label: '@',
                placeholder: '@',
                errorMessages: '=',
                errorMessagesInclude: "@"
            },
            replace: true,
            transclude: true,
            templateUrl: 'templates/form-group.html',
            controller: function($scope, $element) {
                $scope.errorMessageMap = {};
                $scope.showErrors = abmConfig.getErrorState() && $scope.errorMessages !== false;
                if ($scope.showErrors) {
                    var globalErrors = abmConfig.getErrors() || {};
                    if ($scope.errorMessages instanceof Object)
                        angular.extend($scope.errorMessageMap, globalErrors, $scope.errorMessages);
                    else
                        angular.extend($scope.errorMessageMap, globalErrors);
                }
                this.toggleFocus = function(state) {
                    $element.toggleClass("is-focused", state);
                };
                this.toggleEmpty = function(state) {
                    $element.toggleClass("is-empty", state);
                }
                this.toggleError = function(state) {
                    $element.toggleClass("has-error", state);
                }
                this.registerControl = function(scope) {
                    $scope.formControl = scope;
                }
                this.addClass = function(className) {
                    $element.addClass(className);
                }

            },
            link: {
                pre: function($scope, element, attrs, ctrl, transclude) {

                },
                post: function(scope, element, attrs, ctrl, transclude) {
                    /*if (transclude.isSlotFilled('label')) {
                        var label = transclude(angular.noop, null, 'label');
                        element.find('label').replaceWith(label);
                    }
                    if (transclude.isSlotFilled('input')) {
                        var input = transclude(function (clone, scope) {
                            element.find('input').replaceWith(clone);
                        }, null, 'input');
                    }*/

                    transclude(function(clone, scope) {
                        var label = clone.find('label');
                        var formControl = clone.find('.form-control'); // TBD maybe defone an array of valid types
                        label.attr('for', 'form-control-' + scope.$id);
                        formControl.attr('id', 'form-control-' + scope.$id);
                        element.find('abm-transclude-slot').replaceWith(clone);
                    }, null);
                }
            }
        }
    });
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
angular.module('angularBootstrapMaterial').factory('abmConfig', function () {
    var showErrors = true;
    var errorMap = {};
    return {

        toggleErrorState: function () {
            showErrors = !showErrors;
        },
        getErrorState: function () {
            return showErrors;
        },
        getErrors: function (error) {
            return errorMap;
        },
        setErrors: function (error) {
            if (error && error instanceof Object)
                angular.extend(errorMap, error);
        }
    }
});
angular.module('angularBootstrapMaterial').factory('isChar', function () {
    return function _isChar(evt) {
        if (typeof evt.which == "undefined") {
            return true;
        } else if (typeof evt.which == "number" && evt.which > 0) {
            return (!evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8 // backspace
                && evt.which != 9 // tab
                && evt.which != 13 // enter
                && evt.which != 16 // shift
                && evt.which != 17 // ctrl
                && evt.which != 20 // caps lock
                && evt.which != 27 // escape
            );
        }
        return false;
    }
});
