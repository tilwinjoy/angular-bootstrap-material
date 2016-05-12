angular.module('angularBootstrapMaterialDocs')
  .controller('validationDemoCtrl', ['$scope', function ($scope) {
    $scope.user = {
      name: "",
      notifications: {}
    }
    $scope.errorMap = {
      required: "This field is mandatory",
      email: "Please enter a valid email"
    }
    $scope.change = function () {
      console.log($scope);
    }
}]);
