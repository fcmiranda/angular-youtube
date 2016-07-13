(function() {

	'use strict';

	angular.module('app.video').config(config);
	config.$inject = ['$stateProvider'];

	function config($stateProvider) {

		$stateProvider
			.state('featured', {
				url: '/',
				templateUrl: 'app/video/featured/featured.html',
				controller: 'FeaturedController',
				controllerAs: 'vm',
				title: 'destaque',
				settings: {
					nav: 1,
					content: 'destaque'
				}
			})
			.state('videos', {
				url: '/videos',
				templateUrl: 'app/video/list/videos-list.html',
				controller: 'VideosListController',
				controllerAs: 'vm',
				title: 'videos',
				settings: {
					nav: 2,
					content: 'videos'
				}
			})
	}


})();