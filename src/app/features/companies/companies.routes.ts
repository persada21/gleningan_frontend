/**
 * Companies Feature Routes
 */
angular.module('gleniganApp').config(['$routeProvider', function($routeProvider: angular.route.IRouteProvider) {
    $routeProvider.when('/companies', {
        template: '<companies-list></companies-list>'
    });
}]);
