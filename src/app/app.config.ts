/**
 * Main Application Module & Config
 */
angular.module('gleniganApp', ['ngRoute']);

angular.module('gleniganApp').config(['$locationProvider', function($locationProvider: angular.ILocationProvider) {
    $locationProvider.hashPrefix('!');
}]);

angular.module('gleniganApp').run(['$log', function($log: angular.ILogService) {
    $log.info('Glenigan Modern App initialized');
}]);
