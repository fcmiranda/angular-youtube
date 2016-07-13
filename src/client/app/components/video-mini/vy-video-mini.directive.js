/**
 * Diretiva que renderiza os thumbs dos vídeos com suas devidas descrições
 */

(function () {
    'use strict';

    angular
        .module('app.components')
        .directive('vyVideoMini', vyVideoMini);

    /* @ngInject */
    function vyVideoMini() {
        // Cria um video
        return {
            restrict: 'E',
            scope: {
                video: '=',
                width: '=?',
                height: '=?'
            },
            controller: vyVideoMiniDirectiveController,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'app/components/video-mini/vy-video-mini.directive.html'
        };
    }

    vyVideoMiniDirectiveController.$inject = [];

    function vyVideoMiniDirectiveController() {
        var vm = this;
        var thumbnails = vm.video.snippet.thumbnails.medium;

        vm.width = thumbnails.width;
        vm.height = thumbnails.height;
        vm.url = thumbnails.url;
    }

})();
