(function() {
	'use strict';

	angular
		.module('app.core', [
			'ngAnimate', 'ngSanitize', 'ngLocale',
			'ngMaterial',
			'ui.router',
		])
		.config(function($mdThemingProvider) {
			var appBlue = $mdThemingProvider.extendPalette('green', {
				'800': '00ceff'
			});
			$mdThemingProvider.definePalette('appBlue', appBlue);
			$mdThemingProvider.theme('default')
				.primaryPalette('appBlue', {
					'default': '800'
				})
		});

})();