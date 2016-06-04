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
