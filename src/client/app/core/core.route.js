(function() {

	'use strict';

	angular.module('app.core').config(config);
	config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];

	function config($stateProvider, $locationProvider, $urlRouterProvider) {

		$locationProvider.html5Mode(true);

		$stateProvider.state('404', {
			url: '/404',
			templateUrl: 'app/core/404.html',
			title: '404'
		})

		$urlRouterProvider.otherwise('/pagina-inicial');
	}

})();