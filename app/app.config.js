const appConfig = (
    $compileProvider,
    $locationProvider,
    $stateProvider,
    $urlRouterProvider
) => {
    $compileProvider.debugInfoEnabled(false);

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: true,
        rewriteLinks: false
    });

    $stateProvider
        .state('index', {
            url: '/',
            title: '-- CHANGE --'
        });

    $urlRouterProvider.otherwise('/');
};

export default appConfig;
