/**
 * Projects Feature Routes
 */
angular.module('gleniganApp').config(['$routeProvider', function($routeProvider: angular.route.IRouteProvider) {
    $routeProvider.when('/projects', {
        template: '<projects-list></projects-list>'
    });
}]);
