/**
 * @see: https://gist.github.com/atuttle/8804601
 * @see: https://github.com/angular/angular.js/blob/v1.5.7/src/ng/http.js#L1189
 * @see: http://odetocode.com/blogs/scott/archive/2014/04/24/canceling-http-requests-in-angularjs.aspx
 * @see: http://particlesystem.com/json-api-store/docs/v0.7.0/class/src/ajax-adapter.js~AjaxAdapter.html
 * @see: https://github.com/dixieio/redux-json-api/blob/master/src/utils.js
 * @see: https://docs.angularjs.org/api/ng/service/$http#interceptors
 */
function apiService($http, $q) {
    function success(deferred, response) {
        deferred.resolve(response);
    }

    function error(deferred, response) {
        deferred.reject(response);
    }

    function makeRequest(verb, url, options = {}) {
        const deferred = $q.defer();
        const headers = {
            headers: {
                'Content-Type': 'application/vnd.api+json',
                Accept: 'application/vnd.api+json'
            }
        };

        $http(Object.assign(headers, options, {
            method: verb.toUpperCase(),
            url: `http://localhost:3000${url}`
        }))
            .then(success.bind(null, deferred), error.bind(null, deferred));

        return deferred.promise;
    }

    function makeRequestWithData(verb, url, data = {}, config = {}) {
        return makeRequest(verb, url, Object.assign({data: data}, config));
    }

    return {
        change: makeRequestWithData.bind(null, 'patch'),
        create: makeRequestWithData.bind(null, 'post'),
        destroy: makeRequest.bind(null, 'delete'),
        load: makeRequest.bind(null, 'get'),
        update: makeRequestWithData.bind(null, 'put')
    };
}

export default apiService;
