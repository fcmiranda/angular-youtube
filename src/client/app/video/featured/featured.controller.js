(function () {
    'use strict';

    angular
        .module('app.video')
        .controller('FeaturedController', FeaturedController);

    /* @ngInject */
    function FeaturedController($timeout, $rootScope, $state, VideoService) {
        var vm = this;
        vm.pageToken = "";
        vm.videos = [];
        vm.loading = false;
        vm.loadFullVideo = loadFullVideo;
        vm.play = play;
        $rootScope.search = search;

        loadFullVideo();

        VideoService.getVideo().then(function (data) {
            vm.currentVideo = data.items[0];
        });

        function loadFullVideo() {
            vm.loading = !vm.loading;
            var config = {
                pageToken: vm.pageToken
            };

            VideoService.getFullVideoList(config).then(function (callbackObject) {
                vm.pageToken = callbackObject.nextPageToken;

                callbackObject.promise.then(function (data) {
                    vm.videos = (vm.videos.length > 0) ? vm.videos.concat(data.items) : data.items;
                    vm.loading = !vm.loading;
                })
            });
        }

        function play(video) {
            vm.currentVideo = {};
            $timeout(function () {
                vm.currentVideo = video;
            })
        }

        function search(value) {
            $state.go('videos');
        }

    }

})();

