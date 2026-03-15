/**
 * Main Application Routes
 */
angular.module('gleniganApp').config(['$routeProvider', function($routeProvider: angular.route.IRouteProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/projects'
        });
}]);
