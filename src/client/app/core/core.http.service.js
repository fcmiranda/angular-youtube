(function () {
    'use strict';

    angular
        .module('app.core')
        .service('HttpRequestService', HttpRequestService);

    HttpRequestService.$inject = ['$http', '$q'];

    function HttpRequestService($http, $q) {
        return {
            get: get
        };

        function get(requestModel) {

            return $http.get(requestModel.url, requestModel).then(successCallback, errorCallback);

            function successCallback(response) {
                return response.data;
            }

            function errorCallback(response) {
                console.log('Ocorreu um erro');
                return response.data;
            }

        }
    }

})();

