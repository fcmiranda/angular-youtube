(function () {
    'use strict';

    angular
        .module('app.video')
        .controller('VideosListController', VideosController);

    /* @ngInject */
    function VideosController($rootScope, $mdDialog, VideoService) {
        var vm = this;
        vm.pageToken = "";
        vm.videos = [];
        vm.loading = false;
        vm.maxResults = 12;
        vm.playOnDialog = playOnDialog;
        vm.loadFullVideo = loadFullVideo;
        $rootScope.search = search;

        search();

        function playOnDialog(video, ev) {
            var locals = {
                video: video
            };

            //exibe modal
            $mdDialog.show({
                controller: 'VideoDialogController',
                templateUrl: 'app/video/dialog/video-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: locals
            })
        }

        function search() {
            vm.videos = [];
            vm.searchValue = $rootScope.searchValue;
            var config = {
                q: vm.searchValue,
                maxResults: vm.maxResults,
                pageToken: ""
            };

            loadFullVideo(config);
        }

        function loadFullVideo(config) {
            vm.loading = !vm.loading;

            config = config || {
                    pageToken: vm.pageToken,
                    maxResults: vm.maxResults,
                    q: vm.searchValue
                };

            VideoService.getFullVideoList(config).then(
                function (callbackObject) {
                    vm.pageToken = callbackObject.nextPageToken;

                    callbackObject.promise.then(function (data) {
                        console.log(data.items);
                        vm.videos = (vm.videos.length > 0) ? vm.videos.concat(data.items) : data.items;
                        vm.loading = !vm.loading;
                    })
                }
            );
        }

    }

})();