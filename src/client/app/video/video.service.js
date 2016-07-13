(function () {
    'use strict';

    angular
        .module('app.video')
        .service('VideoService', VideoService);

    /*@ngInject*/
    function VideoService(HttpRequestService) {
        var searchURL = 'https://www.googleapis.com/youtube/v3/videos';
        var listVideoURL = 'https://www.googleapis.com/youtube/v3/search';
        var key = 'AIzaSyB_OYCszN3IA5GRe84vFj463IIWwKegG0U';
        var maxResults = 4;
        var pageToken = "";
        var channelId = 'UCCq-5aAoOS86AZ0W7NyqchQ';
        var initialVideo = 'LHzZFm86n5U';

        return {
            getVideo: function () {
                return HttpRequestService.get(
                    {
                        method: 'GET',
                        url: searchURL,
                        params: {
                            id: initialVideo,
                            key: key,
                            part: "snippet,contentDetails,statistics,status"
                        }
                    }
                );
            },
            getVideoList: function (config) {
                var maxResults = config.maxResults || maxResults;
                var pageToken = config.pageToken || pageToken;

                return HttpRequestService.get(
                    {
                        method: 'GET',
                        url: listVideoURL,
                        params: {
                            key: key,
                            maxResults: maxResults,
                            part: 'snippet',
                            channelId: channelId,
                            type: 'video',
                            pageToken: pageToken,
                            q: config.q
                        }
                    }
                );
            },
            getFullVideoList: function (config) {
                return this.getVideoList(config).then(
                    function (data) {
                        var ids = _.map(data.items, 'id');
                        var videoIds = _.map(ids, 'videoId');
                        var nextPageToken = data.nextPageToken;
                        var promise = HttpRequestService.get(
                            {
                                method: 'GET',
                                url: searchURL,
                                params: {
                                    id: videoIds.join(),
                                    key: key,
                                    part: "snippet,contentDetails,statistics,status"
                                }
                            }
                        );

                        return {
                            nextPageToken: nextPageToken,
                            promise: promise
                        }
                    });
            }
        };
    }

})();

