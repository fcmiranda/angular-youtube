/**
 * Diretiva que renderiza o vídeo selecionado
 */


(function () {
    'use strict';

    angular
        .module('app.components')
        .directive('vyVideo', vyVideo);

    /* @ngInject */
    function vyVideo() {
        // Cria um video
        return {
            restrict: 'E',
            scope: {
                video: '=',
                width: '=?',
                height: '=?'
            },
            controller: vyVideoDirectiveController,
            controllerAs: 'vm',
            bindToController: true,
            templateUrl: 'app/components/video/vy-video.directive.html'
        };
    }

    vyVideoDirectiveController.$inject = ['$sce'];

    function vyVideoDirectiveController($sce) {
        var vm = this;
        vm.width = (vm.width) ? vm.width : 560;
        vm.height = (vm.height) ? vm.height : 320;
        vm.src = trustSrc('https://www.youtube.com/embed/' + vm.video.id);

        function trustSrc(src) {
            return $sce.trustAsResourceUrl(src);
        }
    }

})();
