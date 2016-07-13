(function () {
    'use strict';

    angular
        .module('app.video')
        .controller('VideoDialogController', DialogController);

    /* @ngInject */
    function DialogController($scope, $mdDialog, video) {
        $scope.vm = {
            currentVideo : video
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };
    }

})();

