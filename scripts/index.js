angular.module('angularBootstrapMaterial', ['ngMessages']).
controller('testCtrl', ['$scope', function ($scope) {
    $scope.user = {}
}]).run(function (abmConfig) {
    //abmConfig.toggleErrorState();
    abmConfig.setErrors({
        minlength: "min length is something",
        required: "required or something",
        email: "something wrong with email"
    });
});