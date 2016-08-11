angular.module('angularBootstrapMaterial', ['ngMessages']);

angular.module('angularBootstrapMaterial')
  .directive('abmCheckbox', [function () {
    return {
      scope: {
        label: '@'
      },
      transclude: true,
      require: ['?^abmFormGroup'],
      templateUrl: 'templates/checkbox.html',
      link: function ($scope, $element, attrs, ctrls, transclude) {
        var input;
        var formGroup = ctrls[0];
        transclude(function (clone, $scope) {
          $element.find('abm-transclude-slot-checkbox').replaceWith(clone);
        }, null);
        if (formGroup) {
          var $input = $element.find('input');
          input = $input.controller('ngModel');
          $element.find('label').on('mouseenter mouseleave', function (event) {
            if ($input.prop('disabled')) return;
            formGroup.toggleFocus(event.type == 'mouseover');
          });
          if (input) {
            $scope.$watch(function () {
              return input.$invalid;
            }, formGroup.toggleError);
          }
        }
      }
    }
    }]);

angular.module('angularBootstrapMaterial')
  .directive('abmComponent', ['ripple', function (ripple) {
    return {
      link: function ($scope, $element, attrs) {
        var componentMap = {
          ".navbar": "a:not(.withoutripple)",
          ".dropdown-menu": "a",
          ".uib-tab": "a:not(.withoutripple)",
          ".pagination": "li:not(.active):not(.disabled) a:not(.withoutripple)"
        };
        var matches = null;
        //check if the element 
        $parent = $element.parent();
        for (var key in componentMap) {
          if (componentMap.hasOwnProperty(key)) {
            var value = componentMap[key];
            if (matches) break;
            var elems = $parent[0].querySelectorAll(key);
            for (var i = 0; i < elems.length; i++) {
              var elem = elems[i];
              if (elem === $element[0]) {
                if (value)
                  matches = elem.querySelectorAll(value);
                else
                  matches = elem;
                break;
              }
            }
          }
        }
        if (!matches)
          ripple($element);
        else {
          angular.forEach(matches, function (elem) {
            ripple(angular.element(elem));
          });
        }
      }
    };
  }]);

angular.module('angularBootstrapMaterial')
  .directive('abmLabel', [function () {
    return {
      /*templateUrl: 'templates/label.html',
    replace: true,*/
      require: '^abmFormGroup',
      scope: {
        type: '@'
      },
      link: function (scope, element, attrs, formGroupCtrl) {
        if (!formGroupCtrl) // if used outside a form group for some reason, do nothing
          return false;
        var className = 'label-' + (attrs.type || 'static'); // TBD see if this can be an array
        if (!element.hasClass('control-label')) // TBD checkif the condition is unnecessary
          element.addClass('control-label')
        formGroupCtrl.addClass(className);
      }
    }
  }])

angular.module('angularBootstrapMaterial')
  .directive('abmFormControl', ['isChar', function (isChar) {
    return {
      scope: {},
      require: ['ngModel', '^abmFormGroup'],
      compile: function () {
        return function ($scope, $element, attrs, ctrls) {
          var input = ctrls[0];
          var formGroup = ctrls[1];
          if (!$element.hasClass('form-control')) // TBD checkif the condition is unnecessary
            $element.addClass('form-control');
          if (!$element.attr('id')) // TBD checkif the condition is unnecessary
            $element.attr('id', 'form-control-' + $scope.$id);
          formGroup.registerControl($scope);
          $element.on('input paste', function (e) {
              if (isChar(e)) {
                formGroup.toggleEmpty(true);
              }
            }).on('focus', function () {
              formGroup.toggleFocus(true);
            })
            .on('blur', function () {
              formGroup.toggleFocus(false);
              formGroup.toggleEmpty(!$element.val());
            });

          $scope.$watch(function () {
            return input.$invalid;
          }, formGroup.toggleError);
          $scope.$watch(function () {
            return input.$modelValue;
          }, function (newValue, oldValue) {
            formGroup.toggleEmpty(!newValue);
          });
        }
      }
    };
    }]);

angular.module('angularBootstrapMaterial')
  .directive('abmFormGroup', ['abmConfig', function (abmConfig) {
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
      controller: ['$scope', '$element', function ($scope, $element) {
        $scope.errorMessageMap = {};

        function updateErrorMessages() {
          $scope.showErrors = abmConfig.getErrorState() && $scope.errorMessages !== false;
          if ($scope.showErrors) {
            var globalErrors = abmConfig.getErrors() || {};
            if ($scope.errorMessages instanceof Object)
              angular.extend($scope.errorMessageMap, globalErrors, $scope.errorMessages);
            else
              angular.extend($scope.errorMessageMap, globalErrors);
          }
        }

        $scope.$watch('errorMessages', updateErrorMessages);

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
        this.addClass = function (className) {
          $element.addClass(className);
        }

      }],
      link: {
        pre: function ($scope, element, attrs, ctrl, transclude) {

        },
        post: function (scope, element, attrs, ctrl, transclude) {
          /*if (transclude.isSlotFilled('label')) {
              var label = transclude(angular.noop, null, 'label');
              element.find('label').replaceWith(label);
          }
          if (transclude.isSlotFilled('input')) {
              var input = transclude(function (clone, scope) {
                  element.find('input').replaceWith(clone);
              }, null, 'input');
          }*/

          transclude(function (clone, scope) {
            var label = clone.find('label');
            var formControl = clone.find('.form-control'); // TBD maybe defone an array of valid types
            label.attr('for', 'form-control-' + scope.$id);
            formControl.attr('id', 'form-control-' + scope.$id);
            element.find('abm-transclude-slot').replaceWith(clone);
          }, null);
        }
      }
    }
  }]);

angular.module('angularBootstrapMaterial')
  .directive('abmRadio', [function () {
    return {
      scope: {
        label: '@'
      },
      transclude: true,
      require: '?^abmFormGroup',
      templateUrl: 'templates/radio.html',
      link: function ($scope, element, attrs, formGroup, transclude) {
        transclude(function (clone, $scope) {
          element.find('abm-transclude-slot-radio').replaceWith(clone);
        }, null);

        if (formGroup) {
          var $input = element.find('input');
          input = $input.controller('ngModel');
          element.find('label').on('mouseenter mouseleave', function (event) {
            if ($input.prop('disabled')) return;
            formGroup.toggleFocus(event.type == 'mouseover');
          });
          if (input) {
            $scope.$watch(function () {
              return input.$invalid;
            }, formGroup.toggleError);
          }
        }
      }
    }
  }]);

angular.module('angularBootstrapMaterial')
  .directive('abmToggle', [function () {
    return {
      scope: {
        label: '@'
      },
      transclude: true,
      require: '?^abmFormGroup',
      templateUrl: 'templates/toggle.html',
      link: function (scope, element, attrs, ctrl, transclude) {
        transclude(function (clone, scope) {
          element.find('abm-transclude-slot-toggle').replaceWith(clone);
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

angular.module('angularBootstrapMaterial').factory('ripple', function () {


  /**
   * Used till jQLite implements this
   */
  function offset($elem) {

    var docElem, win, rect, doc,
      elem = $elem[0];

    if (!elem) {
      return;
    }

    rect = elem.getBoundingClientRect();

    // Make sure element is not hidden (display: none) or disconnected
    if (rect.width || rect.height || elem.getClientRects().length) {
      doc = elem.ownerDocument;
      win = window;
      docElem = doc.documentElement;

      return {
        top: rect.top + win.pageYOffset - docElem.clientTop,
        left: rect.left + win.pageXOffset - docElem.clientLeft
      };
    }
  }

  /**
   * Get the new size based on the element height/width and the ripple width
   */
  function getNewSize(element, ripple) {
    return (Math.max(element.offsetWidth, element.offsetHeight) / ripple.offsetWidth) * 2.5;
  };


  /**
   * Get the relX
   */
  function getRelX($wrapper, event) {
    var wrapperOffset = offset($wrapper);

    if (!isTouch()) {
      /**
       * Get the mouse position relative to the ripple wrapper
       */
      return event.pageX - wrapperOffset.left;
    } else {
      /**
       * Make sure the user is using only one finger and then get the touch
       * position relative to the ripple wrapper
       */
      if (event.originalEvent) // Do this only if jQuery is present for some reason
        event = event.originalEvent
      if (event.touches.length === 1) {
        return event.touches[0].pageX - wrapperOffset.left;
      }

      return false;
    }
  };


  /**
   * Get the relY
   */
  function getRelY($wrapper, event) {
    var wrapperOffset = offset($wrapper);

    if (!isTouch()) {
      /**
       * Get the mouse position relative to the ripple wrapper
       */
      return event.pageY - wrapperOffset.top;
    } else {
      /**
       * Make sure the user is using only one finger and then get the touch
       * position relative to the ripple wrapper
       */
      if (event.originalEvent) // Do this only if jQuery is present for some reason
        event = event.originalEvent

      if (event.touches.length === 1) {
        return event.touches[0].pageY - wrapperOffset.top;
      }

      return false;
    }
  };


  /**
   * Get the ripple color
   */

  function getRipplesColor($element) {
    var color = $element.data('ripple-color') ? $element.data('ripple-color') : window.getComputedStyle($element[0]).color;
    return color;
  };


  /**
   * Verify if the client browser has transistion support
   */

  function hasTransitionSupport() {
    var thisBody = document.body || document.documentElement;
    var thisStyle = thisBody.style;

    var support = (
      thisStyle.transition !== undefined ||
      thisStyle.WebkitTransition !== undefined ||
      thisStyle.MozTransition !== undefined ||
      thisStyle.MsTransition !== undefined ||
      thisStyle.OTransition !== undefined
    );

    return support;
  };


  /**
   * Verify if the client is using a mobile device
   */
  function isTouch() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  /**
   * Turn on the ripple effect
   */
  function rippleOn($element, $ripple) {
    var size = getNewSize($element[0], $ripple[0]);

    if (hasTransitionSupport()) {
      $ripple
        .css({
          "-ms-transform": "scale(" + size + ")",
          "-moz-transform": "scale(" + size + ")",
          "-webkit-transform": "scale(" + size + ")",
          "transform": "scale(" + size + ")"
        })
        .addClass('ripple-on')
        .data("animating", "on")
        .data("mousedown", "on");;
    } else {
      $ripple.animate({
        "width": Math.max($element.outerWidth(), $element.outerHeight()) * 2,
        "height": Math.max($element.outerWidth(), $element.outerHeight()) * 2,
        "margin-left": Math.max($element.outerWidth(), $element.outerHeight()) * (-1),
        "margin-top": Math.max($element.outerWidth(), $element.outerHeight()) * (-1),
        "opacity": 0.2
      }, 500, function () {
        $ripple.trigger("transitionend");
      });
    }
  };

  /**
   * End the animation of the ripple
   */
  function rippleEnd($ripple) {
    $ripple.data("animating", "off");

    if ($ripple.data("mousedown") === "off") {
      rippleOut($ripple);
    }
  };

  /**
   * Turn off the ripple effect
   */
  function rippleOut($ripple) {
    $ripple.off();

    if (hasTransitionSupport()) {
      $ripple.addClass('ripple-out');
    } else {
      $ripple.animate({
        opacity: 0
      }, 100, function () {
        $ripple.trigger('transitionend');
      });
    }
    $ripple.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
      $ripple.remove();
    });
  };

  return function ($element) {
    var element = $element[0]
    $element.on("mousedown touchstart", function (event) {
      /**
       * Verify if the user is just touching on a device and return if so
       */
      if (isTouch() && event.type === "mousedown") {
        return;
      }


      /**
       * Verify if the current element already has a ripple wrapper element and
       * creates if it doesn't
       */
      if (!element.querySelector('.ripple-container')) {
        $element.append('<div class="ripple-container"></div>');
      }


      /**
       * Find the ripple wrapper
       */
      var $wrapper = angular.element(element.querySelector('.ripple-container'));


      /**
       * Get relY and relX positions
       */
      var relY = getRelY($wrapper, event);
      var relX = getRelX($wrapper, event);


      /**
       * If relY and/or relX are false, return the event
       */
      if (!relY && !relX) {
        return;
      }


      /**
       * Get the ripple color
       */
      var rippleColor = getRipplesColor($element);


      /**
       * Create the ripple element
       */
      var $ripple = angular.element('<div class="ripple"></div>');

      $ripple.css({
        left: relX + 'px',
        top: relY + 'px',
        'background-color': rippleColor
      });


      /**
       * Append the ripple to the wrapper
       */
      $wrapper.append($ripple);


      /**
       * Make sure the ripple has the styles applied (ugly hack but it works)
       */
      (function () {
        return window.getComputedStyle($ripple[0]).opacity;
      })();


      /**
       * Turn on the ripple animation
       */
      rippleOn($element, $ripple);

      /**
       * Call the rippleEnd function when the transition "on" ends
       */
      setTimeout(function () {
        rippleEnd($ripple);
      }, 500);

      /**
       * Detect when the user leaves the element
       */
      $element.on('mouseup mouseleave touchend', function () {
        $ripple.data('mousedown', 'off');

        if ($ripple.data('animating') === 'off') {
          rippleOut($ripple);
        }
      });

    });
  };
});

angular.module("angularBootstrapMaterial").run(["$templateCache", function($templateCache) {$templateCache.put("templates/checkbox.html","<label>\n  <abm-transclude-slot-checkbox></abm-transclude-slot-checkbox>\n  <span class=\"checkbox-material\">\n      <span class=\"check\"></span>\n  </span> {{label}}\n</label>\n");
$templateCache.put("templates/form-group.html","<div class=\"form-group\" ng-class=\"{{classList}}\" ng-form=\"fg_{{$id}}\">\n  <abm-transclude-slot></abm-transclude-slot>\n  <div ng-show=\"showErrors\" ng-messages=\"this[\'fg_\'+$id].$error\" ng-messages-multiple>\n    <div ng-if=\"errorMessagesInclude\" ng-messages-include=\"{{errorMessagesInclude}}\"></div>\n    <div ng-repeat=\"(key,value) in errorMessageMap\">\n      <!-- use ng-message-exp for a message whose key is given by an expression -->\n      <div ng-message-exp=\"key\" class=\"help-block\">{{value}}</div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("templates/input.html","<input id=\"input_{{$id}}\" name=\"input_{{$id}}\" class=\"form-control\">\n");
$templateCache.put("templates/label.html","<label for=\"{{\'input_\'+ formControl.$id}}\" class=\"control-label\">{{label}}</label>\n");
$templateCache.put("templates/radio.html","<label>\n  <abm-transclude-slot-radio></abm-transclude-slot-radio>\n  <span class=\"circle\"></span><span class=\"check\"></span> {{label}}\n</label>\n");
$templateCache.put("templates/toggle.html","<label>\n  {{label}}\n  <abm-transclude-slot-toggle></abm-transclude-slot-toggle>\n  <span class=\"toggle\"></span>\n</label>\n");}]);
