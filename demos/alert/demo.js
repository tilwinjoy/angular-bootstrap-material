angular.module('angularBootstrapMaterialDocs').controller('AlertDemoCtrl', function ($scope) {
  $scope.alertType = 'success';
  $scope.alerts = [
    {
      type: 'danger',
      msg: 'Oh snap! Change a few things up and try submitting again.'
    },
    {
      type: 'info',
      msg: 'Well done! You successfully read this alert message.'
    }
  ];

  $scope.addAlert = function () {
    $scope.alerts.push({
      type: $scope.alertType,
      msg: 'Another alert!'
    });
  };

  $scope.closeAlert = function (index) {
    $scope.alerts.splice(index, 1);
  };
});
