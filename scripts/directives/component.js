angular.module('angularBootstrapMaterial')
  .directive('abmComponent', ['ripple', function (ripple) {
    return {
      link: function ($scope, $element, attrs) {
        var componentMap = {
          ".btn:not(.btn-link)": "",
          ".card-image": "",
          ".navbar": "a:not(.withoutripple)",
          ".dropdown-menu": "a",
          ".nav-tabs": "a:not(.withoutripple)",
          ".withripple": "",
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
        angular.forEach(matches, function (elem) {
          ripple(angular.element(elem));
        });
      }
    };
  }]);
